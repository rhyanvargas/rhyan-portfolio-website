import type { Where } from 'payload'

export const publishedPostsWhere: Where = {
  _status: {
    equals: 'published',
  },
}

export type PublicPostSummary = {
  id: number | string
  title: string
  slug: string
  updatedAt?: string
}

export type PublicPost = PublicPostSummary & {
  content: unknown
}

export function toPublicPostSummary(doc: {
  id: number | string
  title?: string | null
  slug?: string | null
  updatedAt?: string | null
}): PublicPostSummary | null {
  if (!doc.title || !doc.slug) return null
  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    updatedAt: doc.updatedAt ?? undefined,
  }
}
