import type { Project } from '@/schemas/portfolio'

/**
 * Sort projects by ID in ascending order (lowest ID first)
 */
export function sortProjectsById(projects: Project[], ascending: boolean = true): Project[] {
    return [...projects].sort((a, b) => {
        return ascending ? a.id - b.id : b.id - a.id
    })
}

/**
 * Get featured projects sorted by ID
 */
export function getFeaturedProjects(projects: Project[], ascending: boolean = true): Project[] {
    return sortProjectsById(projects.filter(project => project.isFeatured), ascending)
}

/**
 * Get non-featured projects sorted by ID
 */
export function getOtherProjects(projects: Project[], ascending: boolean = true): Project[] {
    return sortProjectsById(projects.filter(project => !project.isFeatured), ascending)
}

/**
 * Get all projects sorted by ID, with featured projects first
 */
export function getAllProjectsSorted(projects: Project[], ascending: boolean = true): Project[] {
    const featured = getFeaturedProjects(projects, ascending)
    const other = getOtherProjects(projects, ascending)
    return [...featured, ...other]
}