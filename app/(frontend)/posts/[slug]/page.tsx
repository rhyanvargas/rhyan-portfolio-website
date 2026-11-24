import Link from 'next/link'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { RefreshRouteOnSave } from '@/components/refresh-route-on-save'
import { getPostBySlug } from '@/lib/posts'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function PostDetailPage({ params }: Args) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()
  const post = await getPostBySlug(slug, { draft: isDraft })

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      {isDraft ? <RefreshRouteOnSave /> : null}
      <Navigation />
      <article className="mx-auto max-w-3xl px-6 py-16">
        {isDraft ? (
          <p className="mb-4 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 font-mono text-xs text-amber-700 dark:text-amber-300">
            Draft preview — unpublished changes may be visible.
          </p>
        ) : null}
        <p className="mb-6">
          <Link href="/posts" className="text-sm text-muted-foreground hover:underline">
            ← All posts
          </Link>
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">{post.title}</h1>
        <div className="prose prose-neutral dark:prose-invert mt-8 max-w-none">
          <RichText data={post.content as never} />
        </div>
      </article>
      <Footer />
    </main>
  )
}
