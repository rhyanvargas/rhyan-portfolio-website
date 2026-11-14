import type { CollectionConfig } from 'payload'

import { SKILL_CATEGORIES } from '@/lib/constants'
import { authenticated } from '@/lib/payload-access'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'category', 'updatedAt'],
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
      options: SKILL_CATEGORIES.map((category) => ({
        label: category,
        value: category,
      })),
    },
  ],
}
