import type { SkillCategory } from '@/lib/constants'
import { SKILL_CATEGORIES } from '@/lib/constants'
import type { EnhancedProject, ProjectMetric } from '@/schemas/portfolio'

type HighlightRow = { item?: string | null } | null
type MetricRow = { label?: string | null; value?: string | null } | null

type TechnologyDoc = {
  id?: number | string
  name?: string | null
  slug?: string | null
  category?: string | null
}

type SkillDoc = {
  id?: number | string
  name?: string | null
  slug?: string | null
  domain?: string | null
}

export type PayloadProjectDoc = {
  id: number | string
  displayOrder?: number | null
  title?: string | null
  slug?: string | null
  summary?: string | null
  highlights?: HighlightRow[] | null
  technologies?: (number | string | TechnologyDoc)[] | null
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

const ROLE_TO_SKILL_CATEGORY: Record<string, SkillCategory> = {
  Frontend: 'Frontend Development',
  Backend: 'Backend Development',
  'Full Stack': 'Full Stack Development',
  'AI Engineer': 'AI/Machine Learning',
  DevOps: 'DevOps/Infrastructure',
  Mobile: 'Mobile Development',
  'Game Developer': 'Game Development',
  Designer: 'UI/UX Design',
  'Data Engineer': 'Data Engineering',
  DevTools: 'API Development',
}

function mapStringArray(rows: HighlightRow[] | null | undefined): string[] {
  if (!rows?.length) return []
  return rows
    .map((row) => row?.item?.trim())
    .filter((item): item is string => Boolean(item))
}

function mapTechnologyNames(
  technologies: PayloadProjectDoc['technologies'],
): string[] {
  if (!technologies?.length) return []

  const names: string[] = []
  for (const tech of technologies) {
    if (typeof tech === 'number' || typeof tech === 'string') continue
    const name = tech.name?.trim()
    if (name) names.push(name)
  }
  return names
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

/**
 * Public filter chips still use SKILL_CATEGORIES (role-bucket taxonomy).
 * CMS `skills.domain` is a different contract — do not map domain onto these chips.
 */
function mapSkillCategoriesFromRoles(
  roles: string[] | null | undefined,
): SkillCategory[] | null {
  if (!roles?.length) return null

  const categories: SkillCategory[] = []
  const seen = new Set<string>()

  for (const role of roles) {
    const category = ROLE_TO_SKILL_CATEGORY[role]
    if (!category || !SKILL_CATEGORIES.includes(category)) continue
    if (seen.has(category)) continue
    seen.add(category)
    categories.push(category)
  }

  return categories.length > 0 ? categories : null
}

export function toEnhancedProject(doc: PayloadProjectDoc): EnhancedProject | null {
  if (!doc.title || !doc.slug || !doc.summary || !doc.thumbnail) return null
  if (!doc.roles?.length) return null

  const highlights = mapStringArray(doc.highlights)
  const tech = mapTechnologyNames(doc.technologies)
  const skillCategories = mapSkillCategoriesFromRoles(doc.roles)

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
