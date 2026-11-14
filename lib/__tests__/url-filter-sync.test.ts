import { describe, expect, it } from 'vitest'
import type { FilterState } from '@/contexts/filter-context'
import {
  filtersToSearchParams,
  searchParamsToFilters,
  serializeFiltersToQueryString,
} from '@/lib/url-filter-sync'

const sample: FilterState = {
  technologies: ['React', 'Next.js'],
  roles: ['Frontend'],
  skillCategories: ['Frontend Development'],
  domains: ['Education'],
  searchQuery: 'lms',
  filterMode: 'AND',
}

describe('url-filter-sync', () => {
  it('serializes active filters into search params', () => {
    const params = filtersToSearchParams(sample)
    expect(params.get('tech')).toBe('React,Next.js')
    expect(params.get('role')).toBe('Frontend')
    expect(params.get('skill')).toBe('Frontend Development')
    expect(params.get('domain')).toBe('Education')
    expect(params.get('q')).toBe('lms')
    expect(params.get('mode')).toBe('AND')
  })

  it('omits empty filter categories and default OR mode', () => {
    const params = filtersToSearchParams({
      technologies: [],
      roles: [],
      skillCategories: [],
      domains: [],
      searchQuery: '',
      filterMode: 'OR',
    })
    expect([...params.keys()]).toEqual([])
  })

  it('parses search params into filter state and ignores invalid mode', () => {
    const params = new URLSearchParams(
      'tech=React&role=Frontend&skill=Frontend%20Development&domain=Education&q=lms&mode=NOPE'
    )
    expect(searchParamsToFilters(params)).toEqual({
      technologies: ['React'],
      roles: ['Frontend'],
      skillCategories: ['Frontend Development'],
      domains: ['Education'],
      searchQuery: 'lms',
      filterMode: 'OR',
    })
  })

  it('silently drops unknown filter values from the URL', () => {
    const params = new URLSearchParams(
      'tech=React,FakeFramework&role=Frontend,Ninja&skill=Frontend%20Development,Cooking&domain=Education,Atlantis'
    )
    expect(searchParamsToFilters(params)).toEqual({
      technologies: ['React'],
      roles: ['Frontend'],
      skillCategories: ['Frontend Development'],
      domains: ['Education'],
      searchQuery: '',
      filterMode: 'OR',
    })
  })

  it('round-trips through query string serialization', () => {
    const qs = serializeFiltersToQueryString(sample)
    expect(searchParamsToFilters(new URLSearchParams(qs))).toEqual(sample)
  })
})

