import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { debounce } from '@/lib/debounce'

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('delays invocation until wait elapses', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 300)

    debounced('a')
    debounced('b')
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(299)
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('b')
  })

  it('cancel prevents a pending call', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 300)
    debounced('x')
    debounced.cancel()
    vi.advanceTimersByTime(500)
    expect(fn).not.toHaveBeenCalled()
  })
})
