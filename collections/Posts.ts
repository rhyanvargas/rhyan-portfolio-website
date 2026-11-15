import type { CollectionConfig } from 'payload'

import { authenticated } from '@/lib/payload-access'
import { getServerURL } from '@/lib/preview'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        if (!slug) return null
        return `${getServerURL()}/posts/${slug}`
      },
    },
    preview: (doc) => {
      const slug = typeof doc?.slug === 'string' ? doc.slug : ''
      if (!slug) return null
      const params = new URLSearchParams({
        collection: 'posts',
        slug,
        path: `/posts/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || '',
      })
      return `${getServerURL()}/next/preview?${params.toString()}`
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
      schedulePublish: true,
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
