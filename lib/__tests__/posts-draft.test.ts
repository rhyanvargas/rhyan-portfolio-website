import { describe, expect, it } from 'vitest'

import { postBySlugWhere } from '@/lib/posts-public'

describe('postBySlugWhere (T8 draft vs published reads)', () => {
  it('scopes public reads to published + slug', () => {
    expect(postBySlugWhere('hello', false)).toEqual({
      and: [
        { _status: { equals: 'published' } },
        { slug: { equals: 'hello' } },
      ],
    })
  })

  it('drops the published constraint when draft mode is on', () => {
    expect(postBySlugWhere('hello', true)).toEqual({
      slug: { equals: 'hello' },
    })
  })
})
