import type { Access, CollectionConfig, PayloadRequest } from 'payload'

import { authenticated } from '@/lib/payload-access'

const isLoggedIn = ({ req }: { req: PayloadRequest }): boolean => Boolean(req.user)

/** Authenticated users, or the very first user on a fresh database. */
const createUser: Access = async ({ req }) => {
  if (req.user) return true
  const { totalDocs } = await req.payload.find({
    collection: 'users',
    limit: 0,
    overrideAccess: true,
  })
  return totalDocs === 0
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    description:
      'All authenticated users can access /admin and manage Users. Change your own password from Account (avatar → Account → Change Password → Save).',
  },
  auth: true,
  access: {
    admin: isLoggedIn,
    create: createUser,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  // Do not declare a persisted `password` field — auth stores hash/salt only.
  // A named password field makes Drizzle SELECT users.password and crashes prod.
  fields: [],
}
