import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = process.env.DATABASE_URL || `file:${path.resolve(dirname, 'payload.db')}`

/**
 * Local/dev default: SQLite (no Docker).
 * Deploy: set DATABASE_URL to a postgres:// or postgresql:// connection string
 * (Neon / Supabase / Vercel Postgres). Optional PAYLOAD_DB=postgres forces Postgres.
 */
function createDbAdapter() {
  const forcePostgres = process.env.PAYLOAD_DB === 'postgres'
  const isPostgres =
    forcePostgres ||
    databaseUrl.startsWith('postgres://') ||
    databaseUrl.startsWith('postgresql://')

  if (isPostgres) {
    return postgresAdapter({
      pool: {
        connectionString: databaseUrl,
      },
    })
  }

  return sqliteAdapter({
    client: {
      url: databaseUrl.startsWith('file:')
        ? databaseUrl
        : `file:${path.resolve(dirname, 'payload.db')}`,
    },
  })
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Projects],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'CHANGE-ME-dev-only-not-for-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: createDbAdapter(),
  sharp,
})
