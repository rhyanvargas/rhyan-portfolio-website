"use client"

import { useEffect, useMemo, useState } from 'react'
import { Filter, Search, X } from 'lucide-react'
import { useFilter } from '@/contexts/filter-context'
import { getActiveFiltersSummary } from '@/lib/filter-utils'
import { debounce } from '@/lib/debounce'
import {
  DOMAIN_CATEGORIES,
  ROLE_TYPES,
  SKILL_CATEGORIES,
  TECHNOLOGIES,
} from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { FilterSection } from '@/components/filters/filter-section'
import { FilterChips } from '@/components/filters/filter-chips'
import { cn } from '@/lib/utils'

export interface FilterControlsProps {
  availableTechnologies?: readonly string[]
  availableRoles?: readonly string[]
  availableSkillCategories?: readonly string[]
  availableDomains?: readonly string[]
  className?: string
}

type PanelOptions = Required<
  Pick<
    FilterControlsProps,
    | 'availableTechnologies'
    | 'availableRoles'
    | 'availableSkillCategories'
    | 'availableDomains'
  >
>

function FilterPanelBody({
  availableTechnologies,
  availableRoles,
  availableSkillCategories,
  availableDomains,
}: PanelOptions) {
  const { state, actions } = useFilter()
  const [searchInput, setSearchInput] = useState(state.searchQuery)

  useEffect(() => {
    setSearchInput(state.searchQuery)
  }, [state.searchQuery])

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        actions.setSearchQuery(value)
      }, 300),
    [actions]
  )

  useEffect(() => {
    return () => debouncedSetSearch.cancel()
  }, [debouncedSetSearch])

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="project-filter-search" className="text-xs font-mono text-muted-foreground">
          Search projects
        </Label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="project-filter-search"
            type="search"
            value={searchInput}
            placeholder="Search titles, summaries, tech…"
            className="pl-9 pr-9"
            onChange={(event) => {
              const value = event.target.value
              setSearchInput(value)
              debouncedSetSearch(value)
            }}
            aria-describedby="project-filter-search-hint"
          />
          {searchInput && (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => {
                setSearchInput('')
                debouncedSetSearch.cancel()
                actions.setSearchQuery('')
              }}
              aria-label="Clear search"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
        <p id="project-filter-search-hint" className="sr-only">
          Search updates results after a short delay
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-md border border-border/60 bg-card/40 px-3 py-2">
        <span className="text-xs font-mono text-muted-foreground">Tech mode</span>
        <div
          className="inline-flex rounded-md border border-border p-0.5"
          role="group"
          aria-label="Technology filter mode"
        >
          {(['OR', 'AND'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              className={cn(
                'rounded px-2.5 py-1 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                state.filterMode === mode
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              aria-pressed={state.filterMode === mode}
              onClick={() => actions.setFilterMode(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {state.filterMode === 'AND' ? 'Match all selected tech' : 'Match any selected tech'}
        </span>
      </div>

      <div className="divide-y divide-border/60">
        <FilterSection
          id="filter-technologies"
          title="Technologies"
          items={availableTechnologies}
          selected={state.technologies}
          onToggle={actions.toggleTechnology}
          defaultOpen
        />
        <FilterSection
          id="filter-roles"
          title="Roles"
          items={availableRoles}
          selected={state.roles}
          onToggle={actions.toggleRole}
        />
        <FilterSection
          id="filter-skills"
          title="Skills"
          items={availableSkillCategories}
          selected={state.skillCategories}
          onToggle={actions.toggleSkillCategory}
        />
        <FilterSection
          id="filter-domains"
          title="Domains"
          items={availableDomains}
          selected={state.domains}
          onToggle={actions.toggleDomain}
        />
      </div>
    </div>
  )
}

export function FilterControls({
  availableTechnologies = TECHNOLOGIES,
  availableRoles = ROLE_TYPES,
  availableSkillCategories = SKILL_CATEGORIES,
  availableDomains = DOMAIN_CATEGORIES,
  className,
}: FilterControlsProps) {
  const { state, actions } = useFilter()
  const summary = getActiveFiltersSummary(state)
  const [mobileOpen, setMobileOpen] = useState(false)

  const panelProps: PanelOptions = {
    availableTechnologies,
    availableRoles,
    availableSkillCategories,
    availableDomains,
  }

  // Mount at most one FilterPanelBody so search/checkbox IDs stay unique.
  const panel = <FilterPanelBody {...panelProps} />

  return (
    <div className={cn('space-y-4', className)}>
      {/* Desktop: only when mobile drawer is closed */}
      {!mobileOpen && (
        <div className="hidden rounded-lg border border-border bg-card/30 p-4 md:block">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              <span className="font-mono text-accent">Filter</span> projects
            </h3>
            {summary.totalActiveFilters > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-muted-foreground hover:text-accent"
                onClick={actions.clearAllFilters}
              >
                Clear all ({summary.totalActiveFilters})
              </Button>
            )}
          </div>
          {panel}
        </div>
      )}

      {/* Mobile drawer: panel mounts only while open */}
      <div className="flex items-center gap-3 md:hidden">
        <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
          <DrawerTrigger asChild>
            <Button type="button" variant="outline" className="gap-2">
              <Filter className="size-4" aria-hidden="true" />
              Filters
              {summary.totalActiveFilters > 0 && (
                <span className="rounded-full bg-accent px-1.5 py-0.5 font-mono text-[10px] text-accent-foreground">
                  {summary.totalActiveFilters}
                </span>
              )}
            </Button>
          </DrawerTrigger>
          {mobileOpen && (
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filter projects</DrawerTitle>
                <DrawerDescription>
                  Narrow projects by technology, role, skill, or domain.
                </DrawerDescription>
              </DrawerHeader>
              <div className="overflow-y-auto px-4 pb-2">{panel}</div>
              <DrawerFooter>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1"
                    onClick={actions.clearAllFilters}
                    disabled={summary.totalActiveFilters === 0}
                  >
                    Clear all
                  </Button>
                  <DrawerClose asChild>
                    <Button type="button" className="flex-1">
                      Show results
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </DrawerContent>
          )}
        </Drawer>

        {summary.totalActiveFilters > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={actions.clearAllFilters}
          >
            Clear
          </Button>
        )}
      </div>

      <FilterChips />
    </div>
  )
}
