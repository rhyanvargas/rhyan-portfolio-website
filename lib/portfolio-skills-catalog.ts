import type { ClassifiedSkill, SkillDomain } from '@/lib/portfolio-cms-classification'

/**
 * Recruiter-facing capabilities (methods), not installable tools.
 * Tools stay on the technologies collection.
 */

export type CatalogSkill = ClassifiedSkill & {
  description: string
}

function skill(
  name: string,
  slug: string,
  domain: SkillDomain,
  description: string,
): CatalogSkill {
  return { name, slug, domain, description }
}

/** Canonical skill inventory for portfolio projects. */
export const PORTFOLIO_SKILLS_CATALOG: readonly CatalogSkill[] = [
  skill(
    'Full-Stack Product Engineering',
    'full-stack-product-engineering',
    'architecture',
    'End-to-end web product delivery across App Router, APIs, and UI.',
  ),
  skill(
    'AI Application Engineering',
    'ai-application-engineering',
    'architecture',
    'LLM features: prompts, embeddings/RAG, streaming UX, and evaluation loops.',
  ),
  skill(
    'Accessibility',
    'accessibility',
    'methodology',
    'WCAG-oriented accessible interface design and component patterns.',
  ),
  skill(
    'Type-Safe Contracts',
    'type-safe-contracts',
    'methodology',
    'TypeScript plus runtime validation for forms, APIs, and shared schemas.',
  ),
  skill(
    'Cloud-Native Delivery',
    'cloud-native-delivery',
    'methodology',
    'Auth, storage, hosting, and CI/CD for cloud-deployed apps.',
  ),
  skill(
    'Design Systems',
    'design-systems',
    'product',
    'Composable component libraries and reusable UI primitives.',
  ),
  skill(
    'Developer Tooling',
    'developer-tooling',
    'methodology',
    'CLIs and automation that improve engineering workflows.',
  ),
  skill(
    'Media & Realtime UX',
    'media-realtime-ux',
    'product',
    'Video, uploads, progress states, and realtime media interfaces.',
  ),
  skill(
    'State & Data Fetching',
    'state-and-data-fetching',
    'architecture',
    'Client state and server-cache patterns for interactive apps.',
  ),
  skill(
    'Performance & UX Metrics',
    'performance-and-ux-metrics',
    'performance',
    'Latency, engagement, and satisfaction metrics used to guide product decisions.',
  ),
  skill(
    'Prompt Orchestration',
    'prompt-orchestration',
    'methodology',
    'Retries, ranking, and structured LLM pipelines behind user-facing AI features.',
  ),
  skill(
    'CI/CD Automation',
    'ci-cd-automation',
    'methodology',
    'Pipeline automation for sync, PRs, and continuous deployment.',
  ),
  skill(
    'Web3 Frontends',
    'web3-frontends',
    'other',
    'Wallet connect and on-chain metadata UX for browser dApps.',
  ),
  skill(
    'ScriptableObject Architecture',
    'scriptableobject-architecture',
    'architecture',
    'Data-driven Unity patterns using ScriptableObjects.',
  ),
  skill(
    'Spatial Learning Experiences',
    'spatial-learning-experiences',
    'product',
    'Quest, dialogue, and gamified learning systems in spatial/3D environments.',
  ),
  skill(
    'SEO & Landing Performance',
    'seo-and-landing-performance',
    'performance',
    'Fast, maintainable marketing/landing pages with SEO-minded structure.',
  ),
] as const

/**
 * Project slug → skill slugs demonstrated by that case study.
 * Derived from roles, highlights, and stack — not from role-bucket labels.
 */
export const PROJECT_SKILL_SLUGS: Readonly<Record<string, readonly string[]>> = {
  'shadcn-interactive-transcript': [
    'ai-application-engineering',
    'accessibility',
    'media-realtime-ux',
    'performance-and-ux-metrics',
    'full-stack-product-engineering',
  ],
  '8p3p-lms-nextjs': [
    'full-stack-product-engineering',
    'cloud-native-delivery',
    'media-realtime-ux',
    'design-systems',
    'type-safe-contracts',
    'accessibility',
  ],
  'ai-utility-bill-analyzer': [
    'ai-application-engineering',
    'full-stack-product-engineering',
    'design-systems',
    'cloud-native-delivery',
  ],
  'upload-git-issues': [
    'developer-tooling',
    'type-safe-contracts',
    'ci-cd-automation',
  ],
  'rhyglot-ai-translator': [
    'ai-application-engineering',
    'prompt-orchestration',
    'performance-and-ux-metrics',
    'full-stack-product-engineering',
    'cloud-native-delivery',
  ],
  'pomoburn-app': [
    'state-and-data-fetching',
    'full-stack-product-engineering',
    'accessibility',
    'performance-and-ux-metrics',
  ],
  'ai-generated-captions': [
    'ai-application-engineering',
    'media-realtime-ux',
    'type-safe-contracts',
    'full-stack-product-engineering',
  ],
  'ai-portfolio-generator': [
    'ai-application-engineering',
    'ci-cd-automation',
    'full-stack-product-engineering',
    'cloud-native-delivery',
  ],
  'fluix-ui': [
    'design-systems',
    'ai-application-engineering',
    'accessibility',
    'type-safe-contracts',
  ],
  'techsaints-website': [
    'full-stack-product-engineering',
    'cloud-native-delivery',
    'ci-cd-automation',
    'seo-and-landing-performance',
  ],
  'anana-landing': [
    'full-stack-product-engineering',
    'accessibility',
    'seo-and-landing-performance',
  ],
  'simpleverse-metaverse': [
    'scriptableobject-architecture',
    'spatial-learning-experiences',
    'performance-and-ux-metrics',
  ],
  '3bears-nft-landing': [
    'web3-frontends',
    'full-stack-product-engineering',
    'seo-and-landing-performance',
  ],
}

export function skillsForProjectSlug(projectSlug: string): readonly string[] {
  return PROJECT_SKILL_SLUGS[projectSlug] ?? []
}
