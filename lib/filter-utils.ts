import type { Project, EnhancedProject } from '@/schemas/portfolio'
import type { FilterState } from '@/contexts/filter-context'
import type { RoleType, SkillCategory, DomainCategory } from '@/lib/constants'

/**
 * Type guard to check if a project is an enhanced project
 */
export function isEnhancedProject(project: Project | EnhancedProject): project is EnhancedProject {
    return 'roles' in project && 'skillCategories' in project
}

/**
 * Normalize a project to have the enhanced structure for filtering
 * This ensures backward compatibility with legacy projects
 */
export function normalizeProjectForFiltering(project: Project | EnhancedProject): EnhancedProject {
    if (isEnhancedProject(project)) {
        return project
    }

    // Convert legacy project to enhanced structure
    return {
        ...project,
        roles: [project.role as RoleType], // Convert single role to array
        skillCategories: inferSkillCategories(project.role, project.tech),
        domains: []
    }
}

/**
 * Infer skill categories based on role and technologies
 * This is used for backward compatibility with legacy projects
 */
function inferSkillCategories(role: string, tech: string[]): SkillCategory[] {
    const categories: string[] = []

    // Map roles to skill categories
    const roleToSkillMap: Record<string, string[]> = {
        'Frontend': ['Frontend Development'],
        'Backend': ['Backend Development'],
        'Full Stack': ['Full Stack Development'],
        'AI Engineer': ['AI/Machine Learning'],
        'DevOps': ['DevOps/Infrastructure'],
        'Mobile': ['Mobile Development'],
        'Game Developer': ['Game Development'],
        'Designer': ['UI/UX Design'],
        'Data Engineer': ['Data Engineering'],
        'DevTools': ['API Development']
    }

    // Add categories based on role
    if (roleToSkillMap[role]) {
        categories.push(...roleToSkillMap[role])
    }

    // Add categories based on technologies
    const techToSkillMap: Record<string, string> = {
        'React': 'Frontend Development',
        'Next.js': 'Full Stack Development',
        'Vue.js': 'Frontend Development',
        'Angular': 'Frontend Development',
        'Node.js': 'Backend Development',
        'Express.js': 'Backend Development',
        'FastAPI': 'Backend Development',
        'Django': 'Backend Development',
        'Flask': 'Backend Development',
        'React Native': 'Mobile Development',
        'Flutter': 'Mobile Development',
        'Unity': 'Game Development',
        'OpenAI': 'AI/Machine Learning',
        'TensorFlow': 'AI/Machine Learning',
        'PyTorch': 'AI/Machine Learning',
        'Docker': 'DevOps/Infrastructure',
        'Kubernetes': 'DevOps/Infrastructure',
        'AWS': 'DevOps/Infrastructure'
    }

    tech.forEach(technology => {
        if (techToSkillMap[technology] && !categories.includes(techToSkillMap[technology])) {
            categories.push(techToSkillMap[technology])
        }
    })

    return categories as SkillCategory[]
}

/**
 * Check if a project matches the technology filters
 */
function matchesTechnologyFilter(
    project: EnhancedProject,
    technologies: string[],
    filterMode: 'AND' | 'OR'
): boolean {
    if (technologies.length === 0) return true

    if (filterMode === 'AND') {
        // All selected technologies must be present in the project
        return technologies.every(tech => project.tech.includes(tech))
    } else {
        // At least one selected technology must be present in the project
        return technologies.some(tech => project.tech.includes(tech))
    }
}

/**
 * Check if a project matches the role filters
 */
function matchesRoleFilter(project: EnhancedProject, roles: string[]): boolean {
    if (roles.length === 0) return true

    // Project matches if it has any of the selected roles
    return roles.some(role => project.roles.includes(role as RoleType))
}

/**
 * Check if a project matches the skill category filters
 */
function matchesSkillCategoryFilter(project: EnhancedProject, skillCategories: string[]): boolean {
    if (skillCategories.length === 0) return true

    // Project matches if it has any of the selected skill categories
    return skillCategories.some(category => project.skillCategories.includes(category as SkillCategory))
}

/**
 * Check if a project matches the domain filters
 */
function matchesDomainFilter(project: EnhancedProject, domains: string[]): boolean {
    if (domains.length === 0) return true

    // If project has no domains, it doesn't match domain filters
    if (!project.domains || project.domains.length === 0) return false

    // Project matches if it has any of the selected domains
    return domains.some(domain => project.domains!.includes(domain as DomainCategory))
}

/**
 * Check if a project matches the search query
 * Searches across project title, summary, and highlights
 */
function matchesSearchQuery(project: EnhancedProject, searchQuery: string): boolean {
    if (!searchQuery.trim()) return true

    const query = searchQuery.toLowerCase().trim()

    // Search in title
    if (project.title.toLowerCase().includes(query)) return true

    // Search in summary
    if (project.summary.toLowerCase().includes(query)) return true

    // Search in highlights
    if (project.highlights.some(highlight => highlight.toLowerCase().includes(query))) return true

    // Search in technologies
    if (project.tech.some(tech => tech.toLowerCase().includes(query))) return true

    return false
}

/**
 * Apply all filter criteria to a single project
 */
export function projectMatchesFilters(
    project: Project | EnhancedProject,
    filters: FilterState
): boolean {
    const normalizedProject = normalizeProjectForFiltering(project)

    // Check each filter criterion
    const matchesTech = matchesTechnologyFilter(
        normalizedProject,
        filters.technologies,
        filters.filterMode
    )

    const matchesRole = matchesRoleFilter(normalizedProject, filters.roles)

    const matchesSkill = matchesSkillCategoryFilter(normalizedProject, filters.skillCategories)

    const matchesDomain = matchesDomainFilter(normalizedProject, filters.domains)

    const matchesSearch = matchesSearchQuery(normalizedProject, filters.searchQuery)

    // Project must match ALL filter criteria (AND logic between different filter types)
    return matchesTech && matchesRole && matchesSkill && matchesDomain && matchesSearch
}

/**
 * Filter an array of projects based on the current filter state
 */
export function filterProjects(
    projects: (Project | EnhancedProject)[],
    filters: FilterState
): (Project | EnhancedProject)[] {
    return projects.filter(project => projectMatchesFilters(project, filters))
}

/**
 * Get the count of projects that match the current filters
 */
export function getFilteredProjectCount(
    projects: (Project | EnhancedProject)[],
    filters: FilterState
): number {
    return filterProjects(projects, filters).length
}

/**
 * Check if any filters are currently active
 */
export function hasActiveFilters(filters: FilterState): boolean {
    return (
        filters.technologies.length > 0 ||
        filters.roles.length > 0 ||
        filters.skillCategories.length > 0 ||
        filters.domains.length > 0 ||
        filters.searchQuery.trim().length > 0
    )
}

/**
 * Get a summary of active filters for display purposes
 */
export function getActiveFiltersSummary(filters: FilterState): {
    technologies: string[]
    roles: string[]
    skillCategories: string[]
    domains: string[]
    searchQuery: string
    totalActiveFilters: number
} {
    const activeFilters = {
        technologies: filters.technologies,
        roles: filters.roles,
        skillCategories: filters.skillCategories,
        domains: filters.domains,
        searchQuery: filters.searchQuery.trim()
    }

    const totalActiveFilters =
        activeFilters.technologies.length +
        activeFilters.roles.length +
        activeFilters.skillCategories.length +
        activeFilters.domains.length +
        (activeFilters.searchQuery ? 1 : 0)

    return {
        ...activeFilters,
        totalActiveFilters
    }
}