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
  },
  auth: true,
  access: {
    admin: isLoggedIn,
    create: createUser,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [],
}
