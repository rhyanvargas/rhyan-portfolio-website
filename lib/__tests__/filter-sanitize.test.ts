import { describe, expect, it } from 'vitest'
import type { FilterState } from '@/contexts/filter-context'
import { filterStatesEqual, sanitizeFilterState } from '@/lib/filter-sanitize'

describe('sanitizeFilterState', () => {
  it('keeps allowlisted values and drops unknowns', () => {
    const dirty: FilterState = {
      technologies: ['React', 'NotARealTech', 'Next.js'],
      roles: ['Frontend', 'Hacker'],
      skillCategories: ['Frontend Development', 'Cooking'],
      domains: ['Education', 'Atlantis'],
      searchQuery: '  lms  ',
      filterMode: 'AND',
    }

    expect(sanitizeFilterState(dirty)).toEqual({
      technologies: ['React', 'Next.js'],
      roles: ['Frontend'],
      skillCategories: ['Frontend Development'],
      domains: ['Education'],
      searchQuery: 'lms',
      filterMode: 'AND',
    })
  })

  it('falls back invalid filter mode to OR', () => {
    const dirty = {
      technologies: [],
      roles: [],
      skillCategories: [],
      domains: [],
      searchQuery: '',
      filterMode: 'NOPE',
    } as unknown as FilterState

    expect(sanitizeFilterState(dirty).filterMode).toBe('OR')
  })
})

describe('filterStatesEqual', () => {
  it('compares filter state fields', () => {
    const a: FilterState = {
      technologies: ['React'],
      roles: [],
      skillCategories: [],
      domains: [],
      searchQuery: '',
      filterMode: 'OR',
    }
    expect(filterStatesEqual(a, { ...a })).toBe(true)
    expect(filterStatesEqual(a, { ...a, technologies: ['Vue.js'] })).toBe(false)
  })
})
