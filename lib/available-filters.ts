import type { Project, EnhancedProject } from '@/schemas/portfolio'
import {
  DOMAIN_CATEGORIES,
  ROLE_TYPES,
  SKILL_CATEGORIES,
  type DomainCategory,
  type RoleType,
  type SkillCategory,
} from '@/lib/constants'
import { normalizeProjectForFiltering } from '@/lib/filter-utils'
import { getCanonicalTechnologies } from '@/lib/tech-normalization'

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b))
}

/**
 * Derive filter options present in the project dataset, constrained to predefined lists.
 * Technologies use the canonical allowlist so niche display labels still map into filters.
 */
export function getAvailableFilterOptions(projects: (Project | EnhancedProject)[]) {
  const technologies: string[] = []
  const roles: string[] = []
  const skillCategories: string[] = []
  const domains: string[] = []

  for (const project of projects) {
    const normalized = normalizeProjectForFiltering(project)
    technologies.push(...getCanonicalTechnologies(normalized.tech))
    roles.push(...normalized.roles)
    skillCategories.push(...normalized.skillCategories)
    if (normalized.domains) {
      domains.push(...normalized.domains)
    }
  }

  const roleSet = new Set<string>(ROLE_TYPES)
  const skillSet = new Set<string>(SKILL_CATEGORIES)
  const domainSet = new Set<string>(DOMAIN_CATEGORIES)

  return {
    technologies: uniqueSorted(technologies),
    roles: uniqueSorted(roles.filter((r): r is RoleType => roleSet.has(r))),
    skillCategories: uniqueSorted(
      skillCategories.filter((s): s is SkillCategory => skillSet.has(s))
    ),
    domains: uniqueSorted(domains.filter((d): d is DomainCategory => domainSet.has(d))),
  }
}
