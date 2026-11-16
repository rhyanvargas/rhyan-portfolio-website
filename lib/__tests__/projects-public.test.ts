import { describe, expect, it } from 'vitest'

import { toEnhancedProject } from '@/lib/projects-public'

describe('toEnhancedProject (T8 Work cutover)', () => {
  it('maps a Payload project + skills into EnhancedProject shape', () => {
    expect(
      toEnhancedProject({
        id: 999,
        displayOrder: 42,
        title: 'Interactive Video Transcript',
        slug: 'shadcn-interactive-transcript',
        summary: 'A transcript player.',
        highlights: [{ item: 'OpenAI embeddings' }, { item: 'Accessible UI' }],
        tech: [{ item: 'React' }, { item: 'TypeScript' }],
        roles: ['AI Engineer'],
        domains: ['Education', 'Personal'],
        links: {
          demo: 'https://example.com/demo',
          repo: null,
          evidence: 'docs/evidence-pack.md',
        },
        thumbnail: '/thumb.png',
        featured: true,
        metrics: [{ label: 'CSAT', value: '4.8/5' }],
        skills: [
          {
            id: 1,
            name: 'React',
            slug: 'react',
            category: 'Frontend Development',
          },
          {
            id: 2,
            name: 'Embeddings',
            slug: 'embeddings',
            category: 'AI/Machine Learning',
          },
          {
            id: 3,
            name: 'API',
            slug: 'api',
            category: 'Frontend Development',
          },
        ],
      }),
    ).toEqual({
      id: 42,
      slug: 'shadcn-interactive-transcript',
      title: 'Interactive Video Transcript',
      summary: 'A transcript player.',
      highlights: ['OpenAI embeddings', 'Accessible UI'],
      tech: ['React', 'TypeScript'],
      links: {
        demo: 'https://example.com/demo',
        evidence: 'docs/evidence-pack.md',
      },
      metrics: [{ label: 'CSAT', value: '4.8/5' }],
      thumbnail: '/thumb.png',
      isFeatured: true,
      roles: ['AI Engineer'],
      skillCategories: ['Frontend Development', 'AI/Machine Learning'],
      domains: ['Education', 'Personal'],
      role: 'AI Engineer',
    })
  })

  it('returns null when required display fields are missing', () => {
    expect(
      toEnhancedProject({
        id: 1,
        title: 'No slug',
        slug: null,
        summary: 'x',
        highlights: [{ item: 'a' }],
        tech: [{ item: 'React' }],
        roles: ['Frontend'],
        thumbnail: '/t.png',
        skills: [],
      }),
    ).toBeNull()

    expect(
      toEnhancedProject({
        id: 2,
        title: 'No tech',
        slug: 'no-tech',
        summary: 'x',
        highlights: [{ item: 'a' }],
        tech: [],
        roles: ['Frontend'],
        thumbnail: '/t.png',
        skills: [{ id: 1, name: 'React', slug: 'react', category: 'Frontend Development' }],
      }),
    ).toBeNull()

    expect(
      toEnhancedProject({
        id: 3,
        title: 'No skills',
        slug: 'no-skills',
        summary: 'x',
        highlights: [{ item: 'a' }],
        tech: [{ item: 'React' }],
        roles: ['Frontend'],
        thumbnail: '/t.png',
        skills: [],
      }),
    ).toBeNull()
  })

  it('treats skill ids without depth as empty categories (null)', () => {
    expect(
      toEnhancedProject({
        id: 4,
        title: 'Unresolved skills',
        slug: 'unresolved',
        summary: 'x',
        highlights: [{ item: 'a' }],
        tech: [{ item: 'React' }],
        roles: ['Frontend'],
        thumbnail: '/t.png',
        skills: [1, 2],
      }),
    ).toBeNull()
  })
})
