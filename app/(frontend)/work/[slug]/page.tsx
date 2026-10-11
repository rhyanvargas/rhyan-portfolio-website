import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{ slug: string }>
}

export default async function WorkProjectPage({ params }: Args) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  const project = docs[0]
  if (!project) notFound()

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-16">
      <p className="text-sm text-muted-foreground">
        <Link href="/work" className="underline underline-offset-4">
          Work
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{project.title}</h1>
      {project.role ? (
        <p className="mt-2 text-sm text-muted-foreground">{project.role}</p>
      ) : null}
      <p className="mt-6 leading-relaxed">{project.summary}</p>
      {project.agentSummary ? (
        <aside className="mt-8 border-t pt-6 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Agent summary</p>
          <p className="mt-2">{project.agentSummary}</p>
        </aside>
      ) : null}
    </main>
  )
}
