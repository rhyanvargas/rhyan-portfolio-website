import Link from 'next/link'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { getPublishedPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export default async function PostsPage() {
  const posts = await getPublishedPosts()

  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
        <p className="mt-2 text-muted-foreground">Writing from Payload.</p>
        {posts.length === 0 ? (
          <p className="mt-8 text-muted-foreground">No published posts yet.</p>
        ) : (
          <ul className="mt-8 space-y-4">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-lg font-medium text-primary underline-offset-4 hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </main>
  )
}
