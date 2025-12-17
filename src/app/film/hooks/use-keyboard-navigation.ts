import { useEffect, useState, useCallback, RefObject } from 'react'

interface UseKeyboardNavigationProps {
  itemCount: number
  onSelect: (index: number) => void
  containerRef?: RefObject<HTMLElement | null>
  enabled?: boolean
  columns?: number
  orientation?: 'horizontal' | 'grid'
}

export function useKeyboardNavigation({
  itemCount,
  onSelect,
  containerRef,
  enabled = true,
  columns = 1,
  orientation = 'horizontal',
}: UseKeyboardNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || itemCount === 0) return

      const key = event.key

      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(key)) {
        return
      }

      event.preventDefault()

      setFocusedIndex((currentIndex) => {
        let newIndex = currentIndex

        if (key === 'ArrowRight') {
          if (orientation === 'horizontal') {
            newIndex = currentIndex < itemCount - 1 ? currentIndex + 1 : currentIndex
          } else {
            newIndex = currentIndex < itemCount - 1 ? currentIndex + 1 : currentIndex
          }
        } else if (key === 'ArrowLeft') {
          if (orientation === 'horizontal') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex
          } else {
            newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex
          }
        } else if (key === 'ArrowDown' && orientation === 'grid') {
          const nextIndex = currentIndex + columns
          newIndex = nextIndex < itemCount ? nextIndex : currentIndex
        } else if (key === 'ArrowUp' && orientation === 'grid') {
          const prevIndex = currentIndex - columns
          newIndex = prevIndex >= 0 ? prevIndex : currentIndex
        } else if (key === 'Enter') {
          if (currentIndex >= 0 && currentIndex < itemCount) {
            onSelect(currentIndex)
          }
          return currentIndex
        } else if (key === 'Escape') {
          return -1
        }

        if (newIndex !== currentIndex && containerRef?.current) {
          const container = containerRef.current
          const items = container.querySelectorAll('[data-movie-card]')
          const targetItem = items[newIndex] as HTMLElement

          if (targetItem) {
            targetItem.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'center',
            })
          }
        }

        return newIndex
      })
    },
    [enabled, itemCount, onSelect, containerRef, columns, orientation]
  )

  useEffect(() => {
    if (!enabled) return

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [enabled, handleKeyDown])

  const setFocus = useCallback((index: number) => {
    setFocusedIndex(index)
  }, [])

  const clearFocus = useCallback(() => {
    setFocusedIndex(-1)
  }, [])

  return {
    focusedIndex,
    setFocus,
    clearFocus,
  }
}
