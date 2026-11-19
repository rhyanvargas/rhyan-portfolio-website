# Payload

Read only when the detected stack is Payload.

Collection configs, camelCase fields, `relationship` + `hasMany`. Register new collections on the existing `buildConfig({ collections })`. Set `admin.useAsTitle` to `title` or `name`.

```ts
import type { CollectionConfig } from 'payload'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['frontend', 'backend', 'database', 'devops', 'design', 'other'],
    },
    { name: 'icon', type: 'text' },
    { name: 'isFeatured', type: 'checkbox', defaultValue: false },
  ],
}
```

```ts
export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'domain',
      type: 'select',
      required: true,
      options: ['architecture', 'performance', 'security', 'methodology', 'product', 'other'],
    },
    { name: 'description', type: 'textarea' },
  ],
}
```

On `projects`, add relations. Do not add a combined tags field.

```ts
{ name: 'technologies', type: 'relationship', relationTo: 'technologies', hasMany: true },
{ name: 'skills', type: 'relationship', relationTo: 'skills', hasMany: true },
```

If the app already has this drift, replace it. Do not add more rows to it:

- `projects.tech` as a free-text array. Tools belong on the `technologies` relation.
- `skills.category` filled from role buckets such as `Frontend Development`. That is not `domain`. Do not copy those values onto `domain`.
- A `TECHNOLOGIES` string list in app constants. That is not a collection.

Keep unrelated project fields that already exist (`highlights`, `roles`, `domains`, `metrics`, `thumbnail`, `featured`, `displayOrder`, `links`). Use `textarea` or the app's existing rich-text editor for `summary` and `content`. Use `upload` for `icon` only when a media collection already exists; otherwise keep the text identifier.
