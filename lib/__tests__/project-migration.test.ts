import { describe, expect, it } from 'vitest'
import type { Project } from '@/schemas/portfolio'
import { migrateProject, migrateProjects } from '@/lib/project-migration'

const legacy: Project = {
  id: 1,
  slug: 'legacy',
  title: 'Legacy LMS',
  role: 'AI',
  summary: 'Education platform with course management and e-commerce checkout',
  highlights: ['Open source library for learning workflows'],
  tech: ['NextJS', 'TailwindCSS', 'OpenAI API', 'AWS Amplify Gen 2', 'React', 'Zod'],
  links: {},
  thumbnail: '/legacy.png',
}

describe('migrateProject', () => {
  it('converts role to roles and maps AI to AI Engineer', () => {
    const migrated = migrateProject(legacy)
    expect(migrated.roles).toEqual(['AI Engineer'])
    expect(migrated.role).toBe('AI')
  })

  it('alias-normalizes known techs but keeps non-canonical display labels', () => {
    const migrated = migrateProject(legacy)
    expect(migrated.tech).toEqual([
      'Next.js',
      'Tailwind CSS',
      'OpenAI',
      'AWS Amplify',
      'React',
      'Zod',
    ])
  })

  it('infers skill categories and domains', () => {
    const migrated = migrateProject(legacy)
    expect(migrated.skillCategories).toEqual(
      expect.arrayContaining(['AI/Machine Learning'])
    )
    expect(migrated.domains).toEqual(
      expect.arrayContaining(['Education', 'E-commerce', 'Open Source'])
    )
  })

  it('migrates batches of projects', () => {
    expect(migrateProjects([legacy])).toHaveLength(1)
  })
})
