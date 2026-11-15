import type { CollectionConfig } from 'payload'

import { DOMAIN_CATEGORIES, ROLE_TYPES } from '@/lib/constants'
import { authenticated } from '@/lib/payload-access'
import { getServerURL } from '@/lib/preview'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : ''
        if (!slug) return null
        return `${getServerURL()}/projects/${slug}`
      },
    },
    preview: (doc) => {
      const slug = typeof doc?.slug === 'string' ? doc.slug : ''
      if (!slug) return null
      const params = new URLSearchParams({
        collection: 'projects',
        slug,
        path: `/projects/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || '',
      })
      return `${getServerURL()}/next/preview?${params.toString()}`
    },
  },
  access: {
    read: () => true,
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
      name: 'displayOrder',
      type: 'number',
      required: true,
      admin: {
        description: 'Work section sort key (lower first). Migrated from portfolio project id.',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'highlights',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'tech',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Technology',
        plural: 'Technologies',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Badge / filter technology labels (free text; filters canonicalize against TECHNOLOGIES).',
      },
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      hasMany: true,
      options: ROLE_TYPES.map((role) => ({
        label: role,
        value: role,
      })),
    },
    {
      name: 'domains',
      type: 'select',
      hasMany: true,
      options: DOMAIN_CATEGORIES.map((domain) => ({
        label: domain,
        value: domain,
      })),
    },
    {
      name: 'links',
      type: 'group',
      fields: [
        {
          name: 'demo',
          type: 'text',
        },
        {
          name: 'repo',
          type: 'text',
        },
        {
          name: 'evidence',
          type: 'text',
        },
      ],
    },
    {
      name: 'metrics',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'thumbnail',
      type: 'text',
      required: true,
      admin: {
        description: 'Public path or URL for the project thumbnail.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'skills',
      type: 'relationship',
      relationTo: 'skills',
      hasMany: true,
      required: true,
      minRows: 1,
      admin: {
        description: 'Skills this project demonstrates. Public filters derive skillCategories from these.',
      },
    },
  ],
}
