import { describe, expect, it } from 'vitest'

import { publishedPostsWhere, toPublicPostSummary } from '@/lib/posts-public'

describe('posts Local API helpers (REQ-004)', () => {
  it('scopes public reads to published documents', () => {
    expect(publishedPostsWhere).toEqual({
      _status: {
        equals: 'published',
      },
    })
  })

  it('maps a Payload post document to a public summary', () => {
    expect(
      toPublicPostSummary({
        id: 1,
        title: 'Hello',
        slug: 'hello',
        updatedAt: '2026-11-14T00:00:00.000Z',
      }),
    ).toEqual({
      id: 1,
      title: 'Hello',
      slug: 'hello',
      updatedAt: '2026-11-14T00:00:00.000Z',
    })
  })

  it('drops incomplete documents instead of rendering broken cards', () => {
    expect(toPublicPostSummary({ id: 2, title: 'Missing slug', slug: null })).toBeNull()
    expect(toPublicPostSummary({ id: 3, title: null, slug: 'no-title' })).toBeNull()
  })
})
