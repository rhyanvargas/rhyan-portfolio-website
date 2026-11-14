import type { EnhancedProject, Project } from '@/schemas/portfolio'

type AnyProject = Project | EnhancedProject

/**
 * Sort projects by ID in ascending order (lowest ID first)
 */
export function sortProjectsById<T extends AnyProject>(projects: T[], ascending: boolean = true): T[] {
    return [...projects].sort((a, b) => {
        return ascending ? a.id - b.id : b.id - a.id
    })
}

/**
 * Get featured projects sorted by ID
 */
export function getFeaturedProjects<T extends AnyProject>(projects: T[], ascending: boolean = true): T[] {
    return sortProjectsById(projects.filter(project => project.isFeatured), ascending)
}

/**
 * Get non-featured projects sorted by ID
 */
export function getOtherProjects<T extends AnyProject>(projects: T[], ascending: boolean = true): T[] {
    return sortProjectsById(projects.filter(project => !project.isFeatured), ascending)
}

/**
 * Get all projects sorted by ID, with featured projects first
 */
export function getAllProjectsSorted<T extends AnyProject>(projects: T[], ascending: boolean = true): T[] {
    const featured = getFeaturedProjects(projects, ascending)
    const other = getOtherProjects(projects, ascending)
    return [...featured, ...other]
}