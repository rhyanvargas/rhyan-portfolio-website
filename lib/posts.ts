import { getPayloadClient } from '@/lib/payload'
import {
  publishedPostsWhere,
  toPublicPostSummary,
  type PublicPost,
  type PublicPostSummary,
} from '@/lib/posts-public'

export {
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

export async function getPublishedPostBySlug(slug: string): Promise<PublicPost | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: {
      and: [
        publishedPostsWhere,
        {
          slug: {
            equals: slug,
          },
        },
      ],
    },
    depth: 0,
    limit: 1,
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
