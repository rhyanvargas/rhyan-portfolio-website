import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { config as loadEnv } from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { Technologies } from './collections/Technologies'
import { Users } from './collections/Users'
import { getServerURL } from './lib/preview'
import { migrations } from './migrations'

loadEnv()

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const payloadSecret = process.env.PAYLOAD_SECRET

if (!payloadSecret) {
  throw new Error(
    'PAYLOAD_SECRET is required. Copy .env.example to .env and set a long random string.',
  )
}

/** Neon / Vercel Marketplace usually injects POSTGRES_URL (and often DATABASE_URL). */
function resolvePostgresUrl(): string | undefined {
  if (process.env.POSTGRES_URL) return process.env.POSTGRES_URL
  const databaseUrl = process.env.DATABASE_URL
  if (
    databaseUrl?.startsWith('postgres://') ||
    databaseUrl?.startsWith('postgresql://')
  ) {
    return databaseUrl
  }
  return undefined
}

/** Local file SQLite, or Turso/libsql when not on Postgres. */
function resolveSqliteUrl(raw: string | undefined): string {
  if (!raw) return `file:${path.resolve(dirname, 'payload.db')}`
  if (
    raw.startsWith('file:') ||
    raw.startsWith('libsql:') ||
    raw.startsWith('http:') ||
    raw.startsWith('https:')
  ) {
    return raw
  }
  return `file:${path.resolve(dirname, raw)}`
}

function createDatabaseAdapter() {
  const postgresUrl = resolvePostgresUrl()

  if (postgresUrl) {
    return vercelPostgresAdapter({
      // Never schema-push against Neon; CI/Vercel use `payload migrate`.
      push: false,
      prodMigrations: migrations,
      pool: {
        connectionString: postgresUrl,
      },
    })
  }

  const sqliteUrl = resolveSqliteUrl(process.env.DATABASE_URL)
  return sqliteAdapter({
    client: {
      url: sqliteUrl,
      ...(process.env.DATABASE_AUTH_TOKEN
        ? { authToken: process.env.DATABASE_AUTH_TOKEN }
        : {}),
    },
  })
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { name: 'mobile', width: 375, height: 667, label: 'Mobile' },
        { name: 'tablet', width: 768, height: 1024, label: 'Tablet' },
        { name: 'desktop', width: 1440, height: 900, label: 'Desktop' },
      ],
    },
  },
  collections: [Users, Posts, Technologies, Skills, Projects],
  editor: lexicalEditor(),
  secret: payloadSecret,
  serverURL: getServerURL(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: createDatabaseAdapter(),
  jobs: {
    access: {
      run: ({ req }) => {
        if (req.user) return true
        const cronSecret = process.env.CRON_SECRET
        if (!cronSecret) return false
        const auth = req.headers.get('authorization')
        return auth === `Bearer ${cronSecret}`
      },
    },
    // Local / long-running Node: pick up schedulePublish jobs every minute.
    // On Vercel: PAYLOAD_JOBS_AUTORUN=false and hit /api/payload-jobs/run via Cron
    // (Hobby allows daily only — see vercel.json `0 0 * * *`).
    autoRun:
      process.env.PAYLOAD_JOBS_AUTORUN === 'false'
        ? undefined
        : [
            {
              cron: '* * * * *',
              queue: 'default',
            },
          ],
  },
})
