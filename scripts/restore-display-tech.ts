import fs from 'fs'
import path from 'path'
import { portfolioConfig } from '../config/portfolio'
import { normalizeTechnologiesForDisplay } from '../lib/tech-normalization'
import type { EnhancedProject, Project } from '../schemas/portfolio'

/** Original tech arrays from git HEAD (pre-normalization strip). */
const ORIGINAL_TECH: Record<string, string[]> = {
  'shadcn-interactive-transcript': [
    'React',
    'TypeScript',
    'shadcn/ui',
    'TailwindCSS',
    'MUX API',
    'WCAG 2.1 AAA',
  ],
  '8p3p-lms-nextjs': [
    'Next.js 15',
    'TypeScript',
    'AWS Amplify',
    'MUX Player',
    'Radix UI',
    'shadcn/ui',
    'TailwindCSS',
    'Zod',
    'React Hook Form',
    'Lucide React',
    'Sonner',
    'Vaul',
  ],
  'ai-utility-bill-analyzer': [
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'shadcn/ui',
    'PickAxe API',
    'Vercel',
  ],
  'upload-git-issues': [
    'TypeScript',
    'Node.js',
    'GitHub API',
    'CLI',
    'CSV Parser',
    'npm',
  ],
  'rhyglot-ai-translator': ['Next.js', 'TypeScript', 'OpenAI', 'Supabase', 'Vercel'],
  'pomoburn-app': ['Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'TailwindCSS'],
  'ai-generated-captions': [
    'Next.js',
    'TypeScript',
    'OpenAI',
    'AI SDK',
    'shadcn/ui',
    'TailwindCSS',
    'Vitest',
    'Zod',
  ],
  'ai-portfolio-generator': [
    'Next.js',
    'TypeScript',
    'Supabase',
    'GitHub Actions',
    'Vercel',
  ],
  'fluix-ui': ['Next.js', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'React', 'WCAG 2.1'],
  'techsaints-website': [
    'Next.js',
    'TypeScript',
    'v0.app',
    'Brevo',
    'Vercel',
    'shadcn/ui',
  ],
  'anana-landing': ['Next.js', 'TypeScript', 'React', 'TailwindCSS'],
  'simpleverse-metaverse': [
    'Unity',
    'C#',
    'Spatial.io SDK',
    'TextMeshPro',
    'ScriptableObject Architecture',
  ],
  '3bears-nft-landing': [
    'Next.js',
    'TypeScript',
    'Ethers.js',
    'Web3.js',
    'Moralis API',
    'Tailwind CSS',
  ],
}

function serializeValue(value: unknown, indent: number): string {
  const pad = '\t'.repeat(indent)
  const padInner = '\t'.repeat(indent + 1)

  if (typeof value === 'string') return JSON.stringify(value)
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]'
    if (value.every((item) => typeof item === 'string')) {
      return `[\n${value.map((item) => `${padInner}${JSON.stringify(item)}`).join(',\n')},\n${pad}]`
    }
    return `[\n${value.map((item) => `${padInner}${serializeValue(item, indent + 1)}`).join(',\n')},\n${pad}]`
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined
    )
    if (entries.length === 0) return '{}'
    return `{\n${entries
      .map(([key, v]) => `${padInner}${key}: ${serializeValue(v, indent + 1)}`)
      .join(',\n')},\n${pad}}`
  }
  return 'null'
}

const restored = (portfolioConfig.projects.items ?? []).map((project) => {
  const original = ORIGINAL_TECH[project.slug]
  if (!original) {
    throw new Error(`Missing original tech for ${project.slug}`)
  }
  return {
    ...(project as EnhancedProject | Project),
    tech: normalizeTechnologiesForDisplay(original),
  }
})

const portfolioPath = path.join(process.cwd(), 'config', 'portfolio.ts')
const source = fs.readFileSync(portfolioPath, 'utf8')
const marker = 'items: ['
const itemsStart = source.indexOf(marker)
if (itemsStart < 0) {
  throw new Error('Could not find projects items array')
}

const arrayOpen = itemsStart + marker.length - 1
let depth = 0
let arrayEnd = -1
for (let i = arrayOpen; i < source.length; i++) {
  const ch = source[i]
  if (ch === '[') depth++
  if (ch === ']') {
    depth--
    if (depth === 0) {
      arrayEnd = i
      break
    }
  }
}

if (arrayEnd < 0) {
  throw new Error('Could not find end of projects items array')
}

const projectsLiteral = serializeValue(restored, 2)
const replaced =
  source.slice(0, itemsStart) +
  `items: ${projectsLiteral}` +
  source.slice(arrayEnd + 1)

fs.writeFileSync(portfolioPath, replaced)
for (const project of restored) {
  console.log(`${project.slug}: ${project.tech.join(' | ')}`)
}
console.log(`Updated ${restored.length} projects with display tech`)
