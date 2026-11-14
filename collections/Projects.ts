import type { CollectionConfig } from 'payload'

import { DOMAIN_CATEGORIES, ROLE_TYPES } from '@/lib/constants'
import { authenticated } from '@/lib/payload-access'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'featured', 'updatedAt'],
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
      name: 'thumbnail',
      type: 'text',
      required: true,
      admin: {
        description: 'Public path or URL for the project thumbnail (matches portfolioConfig string paths).',
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
      admin: {
        description: 'Skills this project demonstrates (Skills collection).',
      },
    },
  ],
}
