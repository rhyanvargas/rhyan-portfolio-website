"use client"

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  clearFiltersFromStorage,
  loadFiltersFromStorage,
  saveFiltersToStorage,
} from '@/lib/filter-persistence'
import {
  filtersToSearchParams,
  hasFilterSearchParams,
  searchParamsToFilters,
} from '@/lib/url-filter-sync'
import { filterStatesEqual } from '@/lib/filter-sanitize'
import { hasActiveFilters } from '@/lib/filter-utils'

// Filter state interface
export interface FilterState {
  technologies: string[]
  roles: string[]
  skillCategories: string[]
  domains: string[]
  searchQuery: string
  filterMode: 'AND' | 'OR'
}

// Filter actions interface
export interface FilterActions {
  toggleTechnology: (tech: string) => void
  toggleRole: (role: string) => void
  toggleSkillCategory: (category: string) => void
  toggleDomain: (domain: string) => void
  setSearchQuery: (query: string) => void
  setFilterMode: (mode: 'AND' | 'OR') => void
  clearAllFilters: () => void
  clearFilterCategory: (category: keyof Omit<FilterState, 'searchQuery' | 'filterMode'>) => void
  hydrateFilters: (filters: FilterState) => void
}

// Combined context type
export interface FilterContextType {
  state: FilterState
  actions: FilterActions
}

// Action types for reducer
type FilterAction =
  | { type: 'TOGGLE_TECHNOLOGY'; payload: string }
  | { type: 'TOGGLE_ROLE'; payload: string }
  | { type: 'TOGGLE_SKILL_CATEGORY'; payload: string }
  | { type: 'TOGGLE_DOMAIN'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_FILTER_MODE'; payload: 'AND' | 'OR' }
  | { type: 'CLEAR_ALL_FILTERS' }
  | { type: 'CLEAR_FILTER_CATEGORY'; payload: keyof Omit<FilterState, 'searchQuery' | 'filterMode'> }
  | { type: 'HYDRATE_FILTERS'; payload: FilterState }

// Initial state
export const initialFilterState: FilterState = {
  technologies: [],
  roles: [],
  skillCategories: [],
  domains: [],
  searchQuery: '',
  filterMode: 'OR',
}

// Helper function to toggle array items
const toggleArrayItem = (array: string[], item: string): string[] => {
  return array.includes(item) ? array.filter((i) => i !== item) : [...array, item]
}

// Reducer function
const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'TOGGLE_TECHNOLOGY':
      return {
        ...state,
        technologies: toggleArrayItem(state.technologies, action.payload),
      }
    case 'TOGGLE_ROLE':
      return {
        ...state,
        roles: toggleArrayItem(state.roles, action.payload),
      }
    case 'TOGGLE_SKILL_CATEGORY':
      return {
        ...state,
        skillCategories: toggleArrayItem(state.skillCategories, action.payload),
      }
    case 'TOGGLE_DOMAIN':
      return {
        ...state,
        domains: toggleArrayItem(state.domains, action.payload),
      }
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      }
    case 'SET_FILTER_MODE':
      return {
        ...state,
        filterMode: action.payload,
      }
    case 'CLEAR_ALL_FILTERS':
      return initialFilterState
    case 'CLEAR_FILTER_CATEGORY':
      return {
        ...state,
        [action.payload]: [],
      }
    case 'HYDRATE_FILTERS':
      return { ...action.payload }
    default: {
      const _exhaustive: never = action
      void _exhaustive
      return state
    }
  }
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

interface FilterProviderProps {
  children: ReactNode
  enableUrlSync?: boolean
  enableLocalStorage?: boolean
}

export const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  enableUrlSync = true,
  enableLocalStorage = true,
}) => {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const hydratedRef = useRef(false)
  const skipNextUrlWriteRef = useRef(false)
  const lastWrittenQueryRef = useRef<string | null>(null)
  const stateRef = useRef(state)
  stateRef.current = state

  // Hydrate once from URL (preferred) or localStorage
  useEffect(() => {
    if (hydratedRef.current) return
    hydratedRef.current = true

    if (enableUrlSync && hasFilterSearchParams(searchParams)) {
      skipNextUrlWriteRef.current = true
      const fromUrl = searchParamsToFilters(searchParams)
      lastWrittenQueryRef.current = filtersToSearchParams(fromUrl).toString()
      dispatch({ type: 'HYDRATE_FILTERS', payload: fromUrl })
      return
    }

    if (enableLocalStorage) {
      const stored = loadFiltersFromStorage()
      if (stored && hasActiveFilters(stored)) {
        skipNextUrlWriteRef.current = true
        lastWrittenQueryRef.current = filtersToSearchParams(stored).toString()
        dispatch({ type: 'HYDRATE_FILTERS', payload: stored })
      }
    }
    // Intentionally run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Browser back/forward (and other external URL changes)
  useEffect(() => {
    if (!enableUrlSync || !hydratedRef.current) return

    const currentQuery = searchParams.toString()
    if (currentQuery === lastWrittenQueryRef.current) return

    const nextState = hasFilterSearchParams(searchParams)
      ? searchParamsToFilters(searchParams)
      : initialFilterState

    if (filterStatesEqual(nextState, stateRef.current)) {
      lastWrittenQueryRef.current = currentQuery
      return
    }

    skipNextUrlWriteRef.current = true
    lastWrittenQueryRef.current = filtersToSearchParams(nextState).toString()
    dispatch({ type: 'HYDRATE_FILTERS', payload: nextState })
  }, [searchParams, enableUrlSync])

  // Persist + sync URL when filters change
  useEffect(() => {
    if (!hydratedRef.current) return

    if (enableLocalStorage) {
      if (hasActiveFilters(state)) {
        saveFiltersToStorage(state)
      } else {
        clearFiltersFromStorage()
      }
    }

    if (!enableUrlSync) return

    if (skipNextUrlWriteRef.current) {
      skipNextUrlWriteRef.current = false
      return
    }

    const nextParams = filtersToSearchParams(state)
    const next = nextParams.toString()
    if (searchParams.toString() === next) {
      lastWrittenQueryRef.current = next
      return
    }

    lastWrittenQueryRef.current = next
    const href = next ? `${pathname}?${next}` : pathname
    router.replace(href, { scroll: false })
  }, [state, enableLocalStorage, enableUrlSync, pathname, router, searchParams])

  const toggleTechnology = useCallback((tech: string) => {
    dispatch({ type: 'TOGGLE_TECHNOLOGY', payload: tech })
  }, [])

  const toggleRole = useCallback((role: string) => {
    dispatch({ type: 'TOGGLE_ROLE', payload: role })
  }, [])

  const toggleSkillCategory = useCallback((category: string) => {
    dispatch({ type: 'TOGGLE_SKILL_CATEGORY', payload: category })
  }, [])

  const toggleDomain = useCallback((domain: string) => {
    dispatch({ type: 'TOGGLE_DOMAIN', payload: domain })
  }, [])

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query })
  }, [])

  const setFilterMode = useCallback((mode: 'AND' | 'OR') => {
    dispatch({ type: 'SET_FILTER_MODE', payload: mode })
  }, [])

  const clearAllFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_FILTERS' })
  }, [])

  const clearFilterCategory = useCallback(
    (category: keyof Omit<FilterState, 'searchQuery' | 'filterMode'>) => {
      dispatch({ type: 'CLEAR_FILTER_CATEGORY', payload: category })
    },
    []
  )

  const hydrateFilters = useCallback((filters: FilterState) => {
    dispatch({ type: 'HYDRATE_FILTERS', payload: filters })
  }, [])

  const actions: FilterActions = useMemo(
    () => ({
      toggleTechnology,
      toggleRole,
      toggleSkillCategory,
      toggleDomain,
      setSearchQuery,
      setFilterMode,
      clearAllFilters,
      clearFilterCategory,
      hydrateFilters,
    }),
    [
      toggleTechnology,
      toggleRole,
      toggleSkillCategory,
      toggleDomain,
      setSearchQuery,
      setFilterMode,
      clearAllFilters,
      clearFilterCategory,
      hydrateFilters,
    ]
  )

  const contextValue: FilterContextType = useMemo(
    () => ({
      state,
      actions,
    }),
    [state, actions]
  )

  return <FilterContext.Provider value={contextValue}>{children}</FilterContext.Provider>
}

export const useFilter = (): FilterContextType => {
  const context = useContext(FilterContext)

  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }

  return context
}
