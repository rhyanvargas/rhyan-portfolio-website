import type { SkillCategory } from '@/lib/constants'
import { SKILL_CATEGORIES } from '@/lib/constants'
import type { EnhancedProject, ProjectMetric } from '@/schemas/portfolio'

type HighlightRow = { item?: string | null } | null
type TechRow = { item?: string | null } | null
type MetricRow = { label?: string | null; value?: string | null } | null

type SkillDoc = {
  id?: number | string
  name?: string | null
  slug?: string | null
  category?: string | null
}

export type PayloadProjectDoc = {
  id: number | string
  displayOrder?: number | null
  title?: string | null
  slug?: string | null
  summary?: string | null
  highlights?: HighlightRow[] | null
  tech?: TechRow[] | null
  roles?: string[] | null
  domains?: string[] | null
  links?: {
    demo?: string | null
    repo?: string | null
    evidence?: string | null
  } | null
  thumbnail?: string | null
  featured?: boolean | null
  metrics?: MetricRow[] | null
  skills?: (number | string | SkillDoc)[] | null
}

function mapStringArray(rows: HighlightRow[] | TechRow[] | null | undefined): string[] {
  if (!rows?.length) return []
  return rows
    .map((row) => row?.item?.trim())
    .filter((item): item is string => Boolean(item))
}

function mapMetrics(rows: MetricRow[] | null | undefined): ProjectMetric[] | undefined {
  if (!rows?.length) return undefined
  const metrics = rows
    .map((row) => {
      const label = row?.label?.trim()
      const value = row?.value?.trim()
      if (!label || !value) return null
      return { label, value }
    })
    .filter((metric): metric is ProjectMetric => metric !== null)

  return metrics.length > 0 ? metrics : undefined
}

function mapSkillCategories(
  skills: PayloadProjectDoc['skills'],
): SkillCategory[] | null {
  if (!skills?.length) return null

  const categories: SkillCategory[] = []
  const seen = new Set<string>()

  for (const skill of skills) {
    if (typeof skill === 'number' || typeof skill === 'string') {
      return null
    }
    const category = skill.category
    if (!category || !SKILL_CATEGORIES.includes(category as SkillCategory)) {
      continue
    }
    if (seen.has(category)) continue
    seen.add(category)
    categories.push(category as SkillCategory)
  }

  return categories.length > 0 ? categories : null
}

export function toEnhancedProject(doc: PayloadProjectDoc): EnhancedProject | null {
  if (!doc.title || !doc.slug || !doc.summary || !doc.thumbnail) return null
  if (!doc.roles?.length) return null

  const highlights = mapStringArray(doc.highlights)
  const tech = mapStringArray(doc.tech)
  const skillCategories = mapSkillCategories(doc.skills)

  if (highlights.length === 0 || tech.length === 0 || !skillCategories) {
    return null
  }

  const orderSource =
    typeof doc.displayOrder === 'number' ? doc.displayOrder : doc.id
  const numericId =
    typeof orderSource === 'number'
      ? orderSource
      : Number.parseInt(String(orderSource), 10)
  if (!Number.isFinite(numericId) || numericId < 1) return null

  const links: EnhancedProject['links'] = {}
  if (doc.links?.demo) links.demo = doc.links.demo
  if (doc.links?.repo) links.repo = doc.links.repo
  if (doc.links?.evidence) links.evidence = doc.links.evidence

  return {
    id: numericId,
    slug: doc.slug,
    title: doc.title,
    summary: doc.summary,
    highlights,
    tech,
    links,
    metrics: mapMetrics(doc.metrics),
    thumbnail: doc.thumbnail,
    isFeatured: Boolean(doc.featured),
    roles: doc.roles as EnhancedProject['roles'],
    skillCategories,
    domains: (doc.domains ?? undefined) as EnhancedProject['domains'],
    role: doc.roles[0] as string,
  }
}
