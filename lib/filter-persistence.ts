import type { FilterState } from '@/contexts/filter-context'
import { sanitizeFilterState } from '@/lib/filter-sanitize'

export const FILTER_STORAGE_KEY = 'portfolio-project-filters'

function isFilterMode(value: unknown): value is FilterState['filterMode'] {
  return value === 'AND' || value === 'OR'
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isValidFilterState(value: unknown): value is FilterState {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Record<string, unknown>
  return (
    isStringArray(candidate.technologies) &&
    isStringArray(candidate.roles) &&
    isStringArray(candidate.skillCategories) &&
    isStringArray(candidate.domains) &&
    typeof candidate.searchQuery === 'string' &&
    isFilterMode(candidate.filterMode)
  )
}

export function loadFiltersFromStorage(): FilterState | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(FILTER_STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!isValidFilterState(parsed)) return null
    return sanitizeFilterState(parsed)
  } catch {
    return null
  }
}

export function saveFiltersToStorage(filters: FilterState): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(
      FILTER_STORAGE_KEY,
      JSON.stringify(sanitizeFilterState(filters))
    )
  } catch {
    // Quota / private mode — ignore persistence failures
  }
}

export function clearFiltersFromStorage(): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(FILTER_STORAGE_KEY)
  } catch {
    // ignore
  }
}
