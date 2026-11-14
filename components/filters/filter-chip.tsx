"use client"

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export type FilterChipCategory = 'technology' | 'role' | 'skill' | 'domain' | 'search'

const CATEGORY_LABELS: Record<FilterChipCategory, string> = {
  technology: 'Tech',
  role: 'Role',
  skill: 'Skill',
  domain: 'Domain',
  search: 'Search',
}

export interface FilterChipProps {
  category: FilterChipCategory
  value: string
  onRemove: () => void
  className?: string
}

export function FilterChip({ category, value, onRemove, className }: FilterChipProps) {
  const label = CATEGORY_LABELS[category]

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-mono text-foreground transition-opacity',
        className
      )}
      data-category={category}
    >
      <span className="text-accent">{label}:</span>
      <span>{value}</span>
      <button
        type="button"
        onClick={onRemove}
        className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Remove ${label} filter ${value}`}
      >
        <X className="size-3" aria-hidden="true" />
      </button>
    </span>
  )
}
