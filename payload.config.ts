import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { config as loadEnv } from 'dotenv'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { Users } from './collections/Users'
import { getServerURL } from './lib/preview'

loadEnv()

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = process.env.DATABASE_URL || `file:${path.resolve(dirname, 'payload.db')}`
const payloadSecret = process.env.PAYLOAD_SECRET

if (!payloadSecret) {
  throw new Error(
    'PAYLOAD_SECRET is required. Copy .env.example to .env and set a long random string.',
  )
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
  collections: [Users, Posts, Projects, Skills],
  editor: lexicalEditor(),
  secret: payloadSecret,
  serverURL: getServerURL(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: databaseUrl.startsWith('file:')
        ? databaseUrl
        : `file:${path.resolve(dirname, 'payload.db')}`,
    },
  }),
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
