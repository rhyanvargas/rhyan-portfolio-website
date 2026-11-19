import type { CollectionConfig } from 'payload'

import { authenticated } from '@/lib/payload-access'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'category', 'isFeatured', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Database', value: 'database' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Design', value: 'design' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Optional icon identifier (CSS class, lucide name, or URL).',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on homepage / about stack only when featured.',
      },
    },
  ],
}
