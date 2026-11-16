import { getPayloadClient } from '@/lib/payload'
import {
  postBySlugWhere,
  publishedPostsWhere,
  toPublicPostSummary,
  type PublicPost,
  type PublicPostSummary,
} from '@/lib/posts-public'

export {
  postBySlugWhere,
  publishedPostsWhere,
  toPublicPostSummary,
  type PublicPost,
  type PublicPostSummary,
} from '@/lib/posts-public'

export async function getPublishedPosts(): Promise<PublicPostSummary[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: publishedPostsWhere,
    sort: '-updatedAt',
    depth: 0,
    limit: 100,
    overrideAccess: false,
  })

  return result.docs
    .map((doc) => toPublicPostSummary(doc))
    .filter((doc): doc is PublicPostSummary => doc !== null)
}

export async function getPostBySlug(
  slug: string,
  options: { draft?: boolean } = {},
): Promise<PublicPost | null> {
  const draft = Boolean(options.draft)
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: postBySlugWhere(slug, draft),
    depth: 0,
    limit: 1,
    draft,
    overrideAccess: false,
  })

  const doc = result.docs[0]
  if (!doc?.title || !doc.slug) return null

  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    updatedAt: doc.updatedAt,
    content: doc.content,
  }
}

/** @deprecated Prefer getPostBySlug(slug, { draft: false }) */
export async function getPublishedPostBySlug(slug: string): Promise<PublicPost | null> {
  return getPostBySlug(slug, { draft: false })
}
