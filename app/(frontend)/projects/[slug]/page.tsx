import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { RefreshRouteOnSave } from '@/components/refresh-route-on-save'
import { Badge } from '@/components/ui/badge'
import { getPublicProjectBySlug } from '@/lib/projects'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectDetailPage({ params }: Args) {
  const { slug } = await params
  const project = await getPublicProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <RefreshRouteOnSave />
      <Navigation />
      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-6">
          <Link href="/#work" className="text-sm text-muted-foreground hover:underline">
            ← Work
          </Link>
        </p>
        <p className="font-mono text-sm text-accent">{project.roles.join(' · ')}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-4 text-muted-foreground">{project.summary}</p>
        <div className="relative mt-8 overflow-hidden rounded-lg">
          <Image
            src={project.thumbnail || '/placeholder.svg'}
            alt={project.title}
            width={960}
            height={540}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        {project.highlights.length > 0 ? (
          <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2">
                <span className="mt-1 text-accent" aria-hidden="true">
                  ▹
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </article>
      <Footer />
    </main>
  )
}
