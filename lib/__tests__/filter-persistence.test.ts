import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { FilterState } from '@/contexts/filter-context'
import {
  FILTER_STORAGE_KEY,
  loadFiltersFromStorage,
  saveFiltersToStorage,
} from '@/lib/filter-persistence'

const sample: FilterState = {
  technologies: ['React'],
  roles: [],
  skillCategories: [],
  domains: [],
  searchQuery: '',
  filterMode: 'OR',
}

describe('filter-persistence', () => {
  beforeEach(() => {
    const store = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value)
      },
      removeItem: (key: string) => {
        store.delete(key)
      },
      clear: () => store.clear(),
    })
  })

  it('saves and restores filter preferences', () => {
    saveFiltersToStorage(sample)
    expect(loadFiltersFromStorage()).toEqual(sample)
    expect(localStorage.getItem(FILTER_STORAGE_KEY)).toContain('React')
  })

  it('drops unknown values when loading from storage', () => {
    localStorage.setItem(
      FILTER_STORAGE_KEY,
      JSON.stringify({
        technologies: ['React', 'FakeTech'],
        roles: ['Frontend', 'Ninja'],
        skillCategories: [],
        domains: [],
        searchQuery: '',
        filterMode: 'OR',
      })
    )
    expect(loadFiltersFromStorage()).toEqual({
      technologies: ['React'],
      roles: ['Frontend'],
      skillCategories: [],
      domains: [],
      searchQuery: '',
      filterMode: 'OR',
    })
  })

  it('returns null when storage is empty or corrupt', () => {
    expect(loadFiltersFromStorage()).toBeNull()
    localStorage.setItem(FILTER_STORAGE_KEY, '{not-json')
    expect(loadFiltersFromStorage()).toBeNull()
  })

  it('handles localStorage write errors gracefully', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => null,
      setItem: () => {
        throw new Error('quota')
      },
      removeItem: () => undefined,
      clear: () => undefined,
    })
    expect(() => saveFiltersToStorage(sample)).not.toThrow()
  })
})
