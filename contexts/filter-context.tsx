"use client"

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

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

// Initial state
const initialState: FilterState = {
    technologies: [],
    roles: [],
    skillCategories: [],
    domains: [],
    searchQuery: '',
    filterMode: 'OR'
}

// Helper function to toggle array items
const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item)
        ? array.filter(i => i !== item)
        : [...array, item]
}

// Reducer function
const filterReducer = (state: FilterState, action: FilterAction): FilterState => {
    switch (action.type) {
        case 'TOGGLE_TECHNOLOGY':
            return {
                ...state,
                technologies: toggleArrayItem(state.technologies, action.payload)
            }
        case 'TOGGLE_ROLE':
            return {
                ...state,
                roles: toggleArrayItem(state.roles, action.payload)
            }
        case 'TOGGLE_SKILL_CATEGORY':
            return {
                ...state,
                skillCategories: toggleArrayItem(state.skillCategories, action.payload)
            }
        case 'TOGGLE_DOMAIN':
            return {
                ...state,
                domains: toggleArrayItem(state.domains, action.payload)
            }
        case 'SET_SEARCH_QUERY':
            return {
                ...state,
                searchQuery: action.payload
            }
        case 'SET_FILTER_MODE':
            return {
                ...state,
                filterMode: action.payload
            }
        case 'CLEAR_ALL_FILTERS':
            return initialState
        case 'CLEAR_FILTER_CATEGORY':
            return {
                ...state,
                [action.payload]: []
            }
        default:
            return state
    }
}

// Create context
const FilterContext = createContext<FilterContextType | undefined>(undefined)

// Provider component props
interface FilterProviderProps {
    children: ReactNode
}

// Provider component
export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(filterReducer, initialState)

    // Action creators
    const actions: FilterActions = {
        toggleTechnology: (tech: string) =>
            dispatch({ type: 'TOGGLE_TECHNOLOGY', payload: tech }),

        toggleRole: (role: string) =>
            dispatch({ type: 'TOGGLE_ROLE', payload: role }),

        toggleSkillCategory: (category: string) =>
            dispatch({ type: 'TOGGLE_SKILL_CATEGORY', payload: category }),

        toggleDomain: (domain: string) =>
            dispatch({ type: 'TOGGLE_DOMAIN', payload: domain }),

        setSearchQuery: (query: string) =>
            dispatch({ type: 'SET_SEARCH_QUERY', payload: query }),

        setFilterMode: (mode: 'AND' | 'OR') =>
            dispatch({ type: 'SET_FILTER_MODE', payload: mode }),

        clearAllFilters: () =>
            dispatch({ type: 'CLEAR_ALL_FILTERS' }),

        clearFilterCategory: (category: keyof Omit<FilterState, 'searchQuery' | 'filterMode'>) =>
            dispatch({ type: 'CLEAR_FILTER_CATEGORY', payload: category })
    }

    const contextValue: FilterContextType = {
        state,
        actions
    }

    return (
        <FilterContext.Provider value={contextValue}>
            {children}
        </FilterContext.Provider>
    )
}

// Custom hook for consuming filter context
export const useFilter = (): FilterContextType => {
    const context = useContext(FilterContext)

    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider')
    }

    return context
}