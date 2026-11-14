import type { FilterState } from '@/contexts/filter-context'
import { sanitizeFilterState } from '@/lib/filter-sanitize'

const PARAM_KEYS = {
  technologies: 'tech',
  roles: 'role',
  skillCategories: 'skill',
  domains: 'domain',
  searchQuery: 'q',
  filterMode: 'mode',
} as const

function splitCsv(value: string | null): string[] {
  if (!value) return []
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function joinCsv(values: string[]): string | null {
  if (values.length === 0) return null
  return values.join(',')
}

/**
 * Encode active filters as URLSearchParams for shareable views.
 */
export function filtersToSearchParams(filters: FilterState): URLSearchParams {
  const sanitized = sanitizeFilterState(filters)
  const params = new URLSearchParams()

  const tech = joinCsv(sanitized.technologies)
  if (tech) params.set(PARAM_KEYS.technologies, tech)

  const roles = joinCsv(sanitized.roles)
  if (roles) params.set(PARAM_KEYS.roles, roles)

  const skills = joinCsv(sanitized.skillCategories)
  if (skills) params.set(PARAM_KEYS.skillCategories, skills)

  const domains = joinCsv(sanitized.domains)
  if (domains) params.set(PARAM_KEYS.domains, domains)

  const query = sanitized.searchQuery
  if (query) params.set(PARAM_KEYS.searchQuery, query)

  if (sanitized.filterMode === 'AND') {
    params.set(PARAM_KEYS.filterMode, 'AND')
  }

  return params
}

/**
 * Parse URL search params into a FilterState. Invalid values are silently dropped.
 */
export function searchParamsToFilters(
  searchParams: URLSearchParams,
  fallback: FilterState = {
    technologies: [],
    roles: [],
    skillCategories: [],
    domains: [],
    searchQuery: '',
    filterMode: 'OR',
  }
): FilterState {
  const modeParam = searchParams.get(PARAM_KEYS.filterMode)
  const filterMode: FilterState['filterMode'] =
    modeParam === 'AND' || modeParam === 'OR' ? modeParam : fallback.filterMode

  return sanitizeFilterState({
    technologies: splitCsv(searchParams.get(PARAM_KEYS.technologies)),
    roles: splitCsv(searchParams.get(PARAM_KEYS.roles)),
    skillCategories: splitCsv(searchParams.get(PARAM_KEYS.skillCategories)),
    domains: splitCsv(searchParams.get(PARAM_KEYS.domains)),
    searchQuery: searchParams.get(PARAM_KEYS.searchQuery)?.trim() ?? '',
    filterMode,
  })
}

export function serializeFiltersToQueryString(filters: FilterState): string {
  return filtersToSearchParams(filters).toString()
}

export function hasFilterSearchParams(searchParams: URLSearchParams): boolean {
  return (
    searchParams.has(PARAM_KEYS.technologies) ||
    searchParams.has(PARAM_KEYS.roles) ||
    searchParams.has(PARAM_KEYS.skillCategories) ||
    searchParams.has(PARAM_KEYS.domains) ||
    searchParams.has(PARAM_KEYS.searchQuery) ||
    searchParams.has(PARAM_KEYS.filterMode)
  )
}
