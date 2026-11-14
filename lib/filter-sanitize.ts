import type { FilterState } from '@/contexts/filter-context'
import {
  DOMAIN_CATEGORIES,
  ROLE_TYPES,
  SKILL_CATEGORIES,
  TECHNOLOGIES,
} from '@/lib/constants'

const TECHNOLOGY_SET = new Set<string>(TECHNOLOGIES)
const ROLE_SET = new Set<string>(ROLE_TYPES)
const SKILL_SET = new Set<string>(SKILL_CATEGORIES)
const DOMAIN_SET = new Set<string>(DOMAIN_CATEGORIES)

function allowlist(values: string[], allowed: Set<string>): string[] {
  return values.filter((value) => allowed.has(value))
}

/**
 * Drop unknown filter values (URL / localStorage). Invalid mode falls back to OR.
 */
export function sanitizeFilterState(filters: FilterState): FilterState {
  return {
    technologies: allowlist(filters.technologies, TECHNOLOGY_SET),
    roles: allowlist(filters.roles, ROLE_SET),
    skillCategories: allowlist(filters.skillCategories, SKILL_SET),
    domains: allowlist(filters.domains, DOMAIN_SET),
    searchQuery: filters.searchQuery.trim(),
    filterMode: filters.filterMode === 'AND' || filters.filterMode === 'OR' ? filters.filterMode : 'OR',
  }
}

export function filterStatesEqual(a: FilterState, b: FilterState): boolean {
  return (
    a.filterMode === b.filterMode &&
    a.searchQuery === b.searchQuery &&
    a.technologies.join('\0') === b.technologies.join('\0') &&
    a.roles.join('\0') === b.roles.join('\0') &&
    a.skillCategories.join('\0') === b.skillCategories.join('\0') &&
    a.domains.join('\0') === b.domains.join('\0')
  )
}
