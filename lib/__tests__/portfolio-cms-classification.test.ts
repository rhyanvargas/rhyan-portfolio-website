import { describe, expect, it } from 'vitest'

import { classifyLabel, classifyLabels } from '@/lib/portfolio-cms-classification'

describe('portfolio-cms-classification', () => {
  it('keeps installable tools as technologies', () => {
    expect(classifyLabel('React')).toEqual({
      technologies: [{ name: 'React', slug: 'react', category: 'frontend' }],
      skills: [],
    })
  })

  it('routes WCAG labels to Accessibility skill without dropping the row', () => {
    expect(classifyLabel('WCAG 2.1 AAA')).toEqual({
      technologies: [],
      skills: [
        {
          name: 'Accessibility',
          slug: 'accessibility',
          domain: 'methodology',
          description: 'WCAG-oriented accessible interface design.',
        },
      ],
    })
  })

  it('dedupes skill slugs across aliases', () => {
    const result = classifyLabels(['WCAG 2.1', 'WCAG 2.1 AAA', 'React'])
    expect(result.skills).toHaveLength(1)
    expect(result.skills[0]?.slug).toBe('accessibility')
    expect(result.technologies.map((t) => t.slug)).toEqual(['react'])
  })
})
