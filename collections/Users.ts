import type { Access, CollectionConfig, FieldAccess, PayloadRequest } from 'payload'

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

/** Any logged-in admin may update any user (solo-author CMS; all users are admins). */
const updateUser: Access = ({ req: { user } }) => Boolean(user)

/** Password field must allow update or Account "Change Password" is denied after Payload 3.90. */
const updatePassword: FieldAccess = ({ req: { user } }) => Boolean(user)

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
    update: updateUser,
    delete: authenticated,
  },
  fields: [
    {
      // Override so field-level update access is explicit for password changes.
      // hidden: true avoids duplicating the Auth UI password inputs.
      name: 'password',
      type: 'text',
      hidden: true,
      access: {
        update: updatePassword,
      },
    },
  ],
}
