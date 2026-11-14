import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterEmptyState } from '@/components/filters/filter-empty-state'
import type { FilterContextType } from '@/contexts/filter-context'

const clearAllFilters = vi.fn()

vi.mock('@/contexts/filter-context', () => ({
  useFilter: (): Pick<FilterContextType, 'actions'> => ({
    actions: {
      toggleTechnology: vi.fn(),
      toggleRole: vi.fn(),
      toggleSkillCategory: vi.fn(),
      toggleDomain: vi.fn(),
      setSearchQuery: vi.fn(),
      setFilterMode: vi.fn(),
      clearAllFilters,
      clearFilterCategory: vi.fn(),
      hydrateFilters: vi.fn(),
    },
  }),
}))

describe('FilterEmptyState', () => {
  it('offers clear all filters for REQ 5.3 / 5.4', async () => {
    const user = userEvent.setup()
    clearAllFilters.mockClear()

    render(<FilterEmptyState />)

    expect(screen.getByRole('status')).toHaveTextContent(/no projects match/i)
    await user.click(screen.getByRole('button', { name: /clear all filters/i }))
    expect(clearAllFilters).toHaveBeenCalledTimes(1)
  })
})
