import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterChip } from '@/components/filters/filter-chip'

describe('FilterChip', () => {
  it('shows category and value and removes on click', async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()

    render(<FilterChip category="technology" value="React" onRemove={onRemove} />)

    expect(screen.getByText('Tech:')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /remove tech filter react/i }))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
