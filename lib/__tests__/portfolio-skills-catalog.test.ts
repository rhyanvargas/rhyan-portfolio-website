import { describe, expect, it } from 'vitest'

import {
  PORTFOLIO_SKILLS_CATALOG,
  PROJECT_SKILL_SLUGS,
  skillsForProjectSlug,
} from '@/lib/portfolio-skills-catalog'
import { portfolioProjectsSnapshot } from '../../scripts/portfolio-projects.snapshot'

describe('portfolio-skills-catalog', () => {
  it('has unique skill slugs', () => {
    const slugs = PORTFOLIO_SKILLS_CATALOG.map((skill) => skill.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('maps every snapshot project to at least one catalog skill', () => {
    for (const project of portfolioProjectsSnapshot) {
      const skillSlugs = skillsForProjectSlug(project.slug)
      expect(skillSlugs.length, project.slug).toBeGreaterThan(0)
      for (const slug of skillSlugs) {
        expect(
          PORTFOLIO_SKILLS_CATALOG.some((skill) => skill.slug === slug),
          `${project.slug} → ${slug}`,
        ).toBe(true)
      }
    }
  })

  it('does not reference unknown project slugs', () => {
    const snapshotSlugs = new Set<string>(
      portfolioProjectsSnapshot.map((p) => p.slug),
    )
    for (const slug of Object.keys(PROJECT_SKILL_SLUGS)) {
      expect(snapshotSlugs.has(slug)).toBe(true)
    }
  })
})
