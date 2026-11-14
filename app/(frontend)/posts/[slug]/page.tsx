import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { getPublishedPostBySlug } from '@/lib/posts'

export const dynamic = 'force-dynamic'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function PostDetailPage({ params }: Args) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <article className="mx-auto max-w-3xl px-6 py-16">
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
