'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { INQUIRY_CTA_HREF, INQUIRY_CTA_LABEL } from '@/lib/inquiry'

type InquiryCtaButtonProps = {
  variant?: 'default' | 'outline'
  className?: string
}

/** Shared CTA for hero + pre-footer — same label and destination. */
export function InquiryCtaButton({
  variant = 'default',
  className,
}: InquiryCtaButtonProps) {
  return (
    <Button
      asChild
      size="lg"
      variant={variant}
      className={
        className ??
        (variant === 'outline'
          ? 'border-accent text-accent hover:bg-accent hover:text-accent-foreground font-mono bg-transparent'
          : 'bg-accent hover:bg-accent/90 text-accent-foreground font-mono')
      }
    >
      <Link href={INQUIRY_CTA_HREF}>{INQUIRY_CTA_LABEL}</Link>
    </Button>
  )
}
