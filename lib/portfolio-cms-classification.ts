/**
 * Classifies legacy free-text tech / tag labels into technologies (tools)
 * vs skills (methods). Used by seed and migration — do not drop either half.
 *
 * @see .cursor/skills/portfolio-cms-schema/references/classification.md
 */

export type TechnologyCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'design'
  | 'other'

export type SkillDomain =
  | 'architecture'
  | 'performance'
  | 'security'
  | 'methodology'
  | 'product'
  | 'other'

export type ClassifiedTechnology = {
  name: string
  slug: string
  category: TechnologyCategory
}

export type ClassifiedSkill = {
  name: string
  slug: string
  domain: SkillDomain
  description?: string
}

export type ClassificationResult = {
  technologies: ClassifiedTechnology[]
  skills: ClassifiedSkill[]
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Labels that are methods, not installable tools. */
const SKILL_BY_LABEL: Record<
  string,
  { name: string; domain: SkillDomain; description?: string }
> = {
  'ScriptableObject Architecture': {
    name: 'ScriptableObject Architecture',
    domain: 'architecture',
    description: 'Data-driven Unity patterns using ScriptableObjects.',
  },
  'WCAG 2.1': {
    name: 'Accessibility',
    domain: 'methodology',
    description: 'WCAG-oriented accessible interface design.',
  },
  'WCAG 2.1 AAA': {
    name: 'Accessibility',
    domain: 'methodology',
    description: 'WCAG-oriented accessible interface design.',
  },
  'REST API': {
    name: 'REST API Design',
    domain: 'methodology',
  },
  'CI/CD': {
    name: 'CI/CD',
    domain: 'methodology',
  },
}

const TECHNOLOGY_CATEGORY_BY_NAME: Record<string, TechnologyCategory> = {
  React: 'frontend',
  'Next.js': 'frontend',
  'Vue.js': 'frontend',
  Angular: 'frontend',
  Svelte: 'frontend',
  TypeScript: 'frontend',
  JavaScript: 'frontend',
  'HTML/CSS': 'frontend',
  'Tailwind CSS': 'frontend',
  'shadcn/ui': 'frontend',
  'Radix UI': 'frontend',
  'Framer Motion': 'frontend',
  'CSS Modules': 'frontend',
  'Styled Components': 'frontend',
  'Lucide React': 'frontend',
  'React Hook Form': 'frontend',
  Sonner: 'frontend',
  Vaul: 'frontend',
  Zod: 'frontend',
  Zustand: 'frontend',
  'TanStack Query': 'frontend',
  'MUX Player': 'frontend',
  TextMeshPro: 'frontend',
  'v0.app': 'frontend',
  'Node.js': 'backend',
  'Express.js': 'backend',
  FastAPI: 'backend',
  Django: 'backend',
  Flask: 'backend',
  GraphQL: 'backend',
  tRPC: 'backend',
  OpenAI: 'backend',
  'AI SDK': 'backend',
  LangChain: 'backend',
  'MUX API': 'backend',
  'Moralis API': 'backend',
  'PickAxe API': 'backend',
  Brevo: 'backend',
  'Ethers.js': 'backend',
  'Web3.js': 'backend',
  'CSV Parser': 'backend',
  PostgreSQL: 'database',
  MySQL: 'database',
  MongoDB: 'database',
  Redis: 'database',
  Supabase: 'database',
  Firebase: 'database',
  Prisma: 'database',
  'Drizzle ORM': 'database',
  AWS: 'devops',
  Vercel: 'devops',
  Netlify: 'devops',
  Docker: 'devops',
  Kubernetes: 'devops',
  'AWS Amplify': 'devops',
  'AWS Bedrock': 'devops',
  'AWS Lambda': 'devops',
  Git: 'devops',
  GitHub: 'devops',
  'GitHub Actions': 'devops',
  Jest: 'devops',
  Vitest: 'devops',
  Cypress: 'devops',
  Playwright: 'devops',
  ESLint: 'devops',
  Prettier: 'devops',
  npm: 'devops',
  CLI: 'devops',
  Figma: 'design',
  'Adobe Creative Suite': 'design',
  Blender: 'design',
  Postman: 'other',
  'React Native': 'other',
  Flutter: 'other',
  Swift: 'other',
  Kotlin: 'other',
  Unity: 'other',
  'C#': 'other',
  'Unreal Engine': 'other',
  Godot: 'other',
  'Spatial.io SDK': 'other',
  'Hugging Face': 'other',
  TensorFlow: 'other',
  PyTorch: 'other',
}

/**
 * Split one legacy label into zero-or-more technologies and skills.
 * Dual labels (tool + method) return both halves.
 */
export function classifyLabel(label: string): ClassificationResult {
  const trimmed = label.trim()
  if (!trimmed) return { technologies: [], skills: [] }

  const skill = SKILL_BY_LABEL[trimmed]
  if (skill) {
    return {
      technologies: [],
      skills: [
        {
          name: skill.name,
          slug: slugify(skill.name),
          domain: skill.domain,
          description: skill.description,
        },
      ],
    }
  }

  const category = TECHNOLOGY_CATEGORY_BY_NAME[trimmed] ?? 'other'
  return {
    technologies: [
      {
        name: trimmed,
        slug: slugify(trimmed),
        category,
      },
    ],
    skills: [],
  }
}

/** Classify many labels; dedupe by slug. */
export function classifyLabels(labels: readonly string[]): ClassificationResult {
  const technologies = new Map<string, ClassifiedTechnology>()
  const skills = new Map<string, ClassifiedSkill>()

  for (const label of labels) {
    const result = classifyLabel(label)
    for (const tech of result.technologies) {
      technologies.set(tech.slug, tech)
    }
    for (const skill of result.skills) {
      skills.set(skill.slug, skill)
    }
  }

  return {
    technologies: [...technologies.values()],
    skills: [...skills.values()],
  }
}
