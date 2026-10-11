import Link from 'next/link'
import { INQUIRY_CTA_LABEL } from '@/lib/inquiry'
import { getPortfolioConfig } from '@/lib/config'

export const metadata = {
  title: 'Start a conversation | Rhyan Vargas',
  description:
    'Begin an inquiry — visitor-type questionnaire coming soon. For now, reach out by email.',
}

/** MVP stub for the shared inquiry CTA. Full questionnaire is a later phase. */
export default function InquirePage() {
  const config = getPortfolioConfig()

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
      <p className="text-sm text-muted-foreground">
        <Link href="/" className="underline underline-offset-4">
          Home
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">{INQUIRY_CTA_LABEL}</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        A short questionnaire that asks who you are and routes next steps will live here.
        Until then, email is the fastest way to reach me.
      </p>
      <p className="mt-8">
        <a
          href={`mailto:${config.personal.email}?subject=${encodeURIComponent(INQUIRY_CTA_LABEL)}`}
          className="font-mono text-accent underline underline-offset-4"
        >
          {config.personal.email}
        </a>
      </p>
    </main>
  )
}
