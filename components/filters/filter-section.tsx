"use client"

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

export interface FilterSectionProps {
  title: string
  items: readonly string[]
  selected: string[]
  onToggle: (item: string) => void
  defaultOpen?: boolean
  id: string
}

export function FilterSection({
  title,
  items,
  selected,
  onToggle,
  defaultOpen = false,
  id,
}: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const selectedCount = selected.length

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className="flex w-full items-center justify-between gap-2 rounded-md py-2 text-left text-sm font-semibold text-foreground outline-none transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-ring"
        aria-controls={`${id}-content`}
      >
        <span className="flex items-center gap-2">
          {title}
          {selectedCount > 0 && (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 font-mono text-xs text-accent">
              {selectedCount}
            </span>
          )}
        </span>
        <ChevronDown
          className={cn('size-4 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </CollapsibleTrigger>
      <CollapsibleContent id={`${id}-content`} className="space-y-2 pb-3 pt-1">
        {items.length === 0 ? (
          <p className="text-xs text-muted-foreground">No options available</p>
        ) : (
          <ul className="grid max-h-48 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
            {items.map((item) => {
              const checkboxId = `${id}-${item.replace(/[^a-zA-Z0-9]/g, '-')}`
              const checked = selected.includes(item)
              return (
                <li key={item} className="flex items-center gap-2">
                  <Checkbox
                    id={checkboxId}
                    checked={checked}
                    onCheckedChange={() => onToggle(item)}
                    aria-label={`Filter by ${title}: ${item}`}
                  />
                  <Label
                    htmlFor={checkboxId}
                    className="cursor-pointer text-xs font-normal text-muted-foreground hover:text-foreground"
                  >
                    {item}
                  </Label>
                </li>
              )
            })}
          </ul>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}
