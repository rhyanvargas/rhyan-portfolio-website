import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function WorkIndexPage() {
  const payload = await getPayloadClient()
  const { docs: projects } = await payload.find({
    collection: 'projects',
    limit: 50,
    sort: '-updatedAt',
  })

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <p className="text-sm text-muted-foreground">
        <Link href="/" className="underline underline-offset-4">
          Home
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Work</h1>
      <p className="mt-2 text-muted-foreground">
        CMS-backed project index (Payload Local API spike).
      </p>
      {projects.length === 0 ? (
        <p className="mt-8 text-muted-foreground">
          No projects yet. Add one in{' '}
          <Link href="/admin" className="underline underline-offset-4">
            /admin
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                href={`/work/${project.slug}`}
                className="text-lg font-medium underline-offset-4 hover:underline"
              >
                {project.title}
              </Link>
              {project.summary ? (
                <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
