import { describe, expect, it } from 'vitest'
import {
  getCanonicalTechnologies,
  normalizeTechnologiesForDisplay,
  projectHasTechnology,
} from '@/lib/tech-normalization'

describe('tech-normalization', () => {
  it('preserves niche display labels while alias-normalizing known names', () => {
    expect(
      normalizeTechnologiesForDisplay([
        'Next.js 15',
        'TailwindCSS',
        'MUX API',
        'Zod',
        'React',
      ])
    ).toEqual(['Next.js', 'Tailwind CSS', 'MUX API', 'Zod', 'React'])
  })

  it('derives canonical technologies for filtering', () => {
    expect(
      getCanonicalTechnologies(['Next.js 15', 'MUX API', 'Zod', 'TailwindCSS'])
    ).toEqual(['Next.js', 'Tailwind CSS'])
  })

  it('matches filter tech against aliases and canonical labels', () => {
    expect(projectHasTechnology(['Next.js 15', 'Zod'], 'Next.js')).toBe(true)
    expect(projectHasTechnology(['TailwindCSS'], 'Tailwind CSS')).toBe(true)
    expect(projectHasTechnology(['Zod'], 'React')).toBe(false)
  })
})
