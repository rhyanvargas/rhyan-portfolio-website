"use client"

import { useFilter } from '@/contexts/filter-context'
import { getActiveFiltersSummary } from '@/lib/filter-utils'
import { Button } from '@/components/ui/button'
import { FilterChip, type FilterChipCategory } from '@/components/filters/filter-chip'

export function FilterChips() {
  const { state, actions } = useFilter()
  const summary = getActiveFiltersSummary(state)

  if (summary.totalActiveFilters === 0) {
    return null
  }

  const chips: Array<{ category: FilterChipCategory; value: string; onRemove: () => void }> = [
    ...summary.technologies.map((value) => ({
      category: 'technology' as const,
      value,
      onRemove: () => actions.toggleTechnology(value),
    })),
    ...summary.roles.map((value) => ({
      category: 'role' as const,
      value,
      onRemove: () => actions.toggleRole(value),
    })),
    ...summary.skillCategories.map((value) => ({
      category: 'skill' as const,
      value,
      onRemove: () => actions.toggleSkillCategory(value),
    })),
    ...summary.domains.map((value) => ({
      category: 'domain' as const,
      value,
      onRemove: () => actions.toggleDomain(value),
    })),
  ]

  if (summary.searchQuery) {
    chips.push({
      category: 'search',
      value: summary.searchQuery,
      onRemove: () => actions.setSearchQuery(''),
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-live="polite">
      <span className="text-xs font-mono text-muted-foreground">Active:</span>
      {chips.map((chip) => (
        <FilterChip
          key={`${chip.category}-${chip.value}`}
          category={chip.category}
          value={chip.value}
          onRemove={chip.onRemove}
        />
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs text-muted-foreground hover:text-accent"
        onClick={actions.clearAllFilters}
      >
        Clear all
      </Button>
    </div>
  )
}
