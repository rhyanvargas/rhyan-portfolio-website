"use client"

import { Button } from '@/components/ui/button'
import { useFilter } from '@/contexts/filter-context'

export interface FilterEmptyStateProps {
  message?: string
}

export function FilterEmptyState({
  message = 'No projects match your current filters.',
}: FilterEmptyStateProps) {
  const { actions } = useFilter()

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/20 px-6 py-16 text-center"
      role="status"
      aria-live="polite"
    >
      <p className="mb-2 font-mono text-sm text-accent">No matches</p>
      <p className="mb-6 max-w-md text-sm text-muted-foreground">{message}</p>
      <Button type="button" variant="outline" onClick={actions.clearAllFilters}>
        Clear all filters
      </Button>
    </div>
  )
}
