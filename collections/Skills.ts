import type { CollectionConfig } from 'payload'

import { authenticated } from '@/lib/payload-access'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'domain', 'updatedAt'],
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
      name: 'domain',
      type: 'select',
      required: true,
      options: [
        { label: 'Architecture', value: 'architecture' },
        { label: 'Performance', value: 'performance' },
        { label: 'Security', value: 'security' },
        { label: 'Methodology', value: 'methodology' },
        { label: 'Product', value: 'product' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
