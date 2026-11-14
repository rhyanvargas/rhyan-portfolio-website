import { describe, expect, it } from 'vitest'
import type { Project, EnhancedProject } from '@/schemas/portfolio'
import type { FilterState } from '@/contexts/filter-context'
import {
  filterProjects,
  getFilteredProjectCount,
  hasActiveFilters,
  getActiveFiltersSummary,
  projectMatchesFilters,
  normalizeProjectForFiltering,
} from '@/lib/filter-utils'

const baseProject: Project = {
  id: 1,
  slug: 'demo',
  title: 'Demo Project',
  role: 'Frontend',
  summary: 'A React portfolio demo with accessibility focus',
  highlights: ['Built with TypeScript', 'Deployed on Vercel'],
  tech: ['React', 'TypeScript', 'Vercel'],
  links: {},
  thumbnail: '/demo.png',
  isFeatured: true,
}

const enhancedProject: EnhancedProject = {
  ...baseProject,
  roles: ['Frontend', 'Full Stack'],
  skillCategories: ['Frontend Development', 'Full Stack Development'],
  domains: ['Open Source', 'Personal'],
}

const emptyFilters: FilterState = {
  technologies: [],
  roles: [],
  skillCategories: [],
  domains: [],
  searchQuery: '',
  filterMode: 'OR',
}

describe('filterProjects', () => {
  it('returns all projects when no filters are active', () => {
    expect(filterProjects([baseProject, enhancedProject], emptyFilters)).toHaveLength(2)
  })

  it('filters by technology with OR mode', () => {
    const filters: FilterState = {
      ...emptyFilters,
      technologies: ['React', 'OpenAI'],
      filterMode: 'OR',
    }
    const projects = [
      enhancedProject,
      { ...enhancedProject, id: 2, slug: 'other', tech: ['OpenAI', 'Python'] as string[] },
      { ...enhancedProject, id: 3, slug: 'none', tech: ['Unity'] as string[] },
    ]
    expect(filterProjects(projects, filters).map((p) => p.slug)).toEqual(['demo', 'other'])
  })

  it('filters by technology with AND mode', () => {
    const filters: FilterState = {
      ...emptyFilters,
      technologies: ['React', 'TypeScript'],
      filterMode: 'AND',
    }
    expect(projectMatchesFilters(enhancedProject, filters)).toBe(true)
    expect(
      projectMatchesFilters(
        { ...enhancedProject, tech: ['React'] },
        filters
      )
    ).toBe(false)
  })

  it('matches canonical tech filters against aliased display labels', () => {
    const project = {
      ...enhancedProject,
      tech: ['Next.js 15', 'TailwindCSS', 'Zod'],
    }
    expect(
      projectMatchesFilters(project, {
        ...emptyFilters,
        technologies: ['Next.js', 'Tailwind CSS'],
        filterMode: 'AND',
      })
    ).toBe(true)
  })


  it('filters by roles with OR semantics', () => {
    const filters: FilterState = { ...emptyFilters, roles: ['AI Engineer'] }
    expect(projectMatchesFilters(enhancedProject, filters)).toBe(false)
    expect(
      projectMatchesFilters(
        { ...enhancedProject, roles: ['AI Engineer'] },
        filters
      )
    ).toBe(true)
  })

  it('requires both skill and technology when combined', () => {
    const filters: FilterState = {
      ...emptyFilters,
      technologies: ['React'],
      skillCategories: ['AI/Machine Learning'],
    }
    expect(projectMatchesFilters(enhancedProject, filters)).toBe(false)
  })

  it('searches title, summary, and highlights', () => {
    expect(
      projectMatchesFilters(enhancedProject, { ...emptyFilters, searchQuery: 'accessibility' })
    ).toBe(true)
    expect(
      projectMatchesFilters(enhancedProject, { ...emptyFilters, searchQuery: 'TypeScript' })
    ).toBe(true)
    expect(
      projectMatchesFilters(enhancedProject, { ...emptyFilters, searchQuery: 'nomatch' })
    ).toBe(false)
  })
})

describe('filter helpers', () => {
  it('normalizes legacy projects for filtering', () => {
    const normalized = normalizeProjectForFiltering(baseProject)
    expect(normalized.roles).toEqual(['Frontend'])
    expect(normalized.skillCategories.length).toBeGreaterThan(0)
  })

  it('reports active filter summary and counts', () => {
    const filters: FilterState = {
      ...emptyFilters,
      technologies: ['React'],
      roles: ['Frontend'],
      searchQuery: 'demo',
    }
    expect(hasActiveFilters(filters)).toBe(true)
    expect(getActiveFiltersSummary(filters).totalActiveFilters).toBe(3)
    expect(getFilteredProjectCount([enhancedProject], filters)).toBe(1)
  })
})
