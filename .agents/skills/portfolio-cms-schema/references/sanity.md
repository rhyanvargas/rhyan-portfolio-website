# Sanity

Read only when the detected stack is Sanity.

One document type per collection. Native `reference` arrays. `title` or `name` is the preview title.

```ts
import { defineArrayMember, defineField, defineType } from 'sanity'

export const technology = defineType({
  name: 'technology',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({
      name: 'category',
      type: 'string',
      options: { list: ['frontend', 'backend', 'database', 'devops', 'design', 'other'] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'icon', type: 'image' }),
    defineField({ name: 'isFeatured', type: 'boolean', initialValue: false }),
  ],
})

export const skill = defineType({
  name: 'skill',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({
      name: 'domain',
      type: 'string',
      options: { list: ['architecture', 'performance', 'security', 'methodology', 'product', 'other'] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', type: 'text' }),
  ],
})
```

On `project`:

```ts
defineField({
  name: 'technologies',
  type: 'array',
  of: [defineArrayMember({ type: 'reference', to: [{ type: 'technology' }] })],
}),
defineField({
  name: 'skills',
  type: 'array',
  of: [defineArrayMember({ type: 'reference', to: [{ type: 'skill' }] })],
}),
```

Register the types in the existing Sanity schema entry. Keep unrelated project fields.
