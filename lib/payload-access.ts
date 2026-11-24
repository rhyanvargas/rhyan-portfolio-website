import type { Access } from 'payload'

/** Solo-author CMS: any authenticated user may mutate. */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)
