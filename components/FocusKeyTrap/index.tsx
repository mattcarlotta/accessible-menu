import { useEffect, useRef } from 'react'
import type { AccessibleElement, KeyboardEvent, ReactNode } from '../../types'
import {
  ACCESSIBLE_ELEMENTS,
  isFocusable
} from '../../utils/accessibilityHelpers'

export type FocusTrapProps = {
  children: ReactNode
  className?: string
  onEscapePress: () => void
  focusOnMount?: boolean
  menuOpen: boolean
}

export default function FocusKeyTrap({
  children,
  className,
  onEscapePress,
  focusOnMount = false,
  menuOpen
}: FocusTrapProps) {
  const tabIndex = useRef<number>(0)
  const focusTrapRef = useRef<HTMLDivElement | null>(null)
  const tabbableItemsRef = useRef<Array<AccessibleElement>>([])

  const focusOnTab = (index: number) => {
    tabbableItemsRef.current?.[index]?.focus()
    tabIndex.current = index
  }

  const handleTabReset = () => {
    tabIndex.current = 0
  }

  const handleFocusTrap = (event: KeyboardEvent<HTMLElement>) => {
    if (!menuOpen) return
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault()
        focusOnTab(tabIndex.current - 1 < 0 ? 0 : tabIndex.current - 1)
        break
      case 'ArrowDown':
        event.preventDefault()
        const tabItemsLength = tabbableItemsRef.current.length - 1
        focusOnTab(
          tabIndex.current + 1 > tabItemsLength
            ? tabItemsLength
            : tabIndex.current + 1
        )
        break
      case 'Escape':
      case 'Esc':
        event.stopPropagation()
        focusOnTab(0)
        onEscapePress()
        break
      case 'Tab':
        handleTabReset()
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (focusTrapRef.current) {
      tabbableItemsRef.current = Array.from(
        focusTrapRef.current.querySelectorAll(ACCESSIBLE_ELEMENTS.join(','))
      ).filter((element) =>
        isFocusable(element as AccessibleElement, {
          ignoreTabIndex: true,
          ignoreHrefAttr: true
        })
      ) as Array<AccessibleElement>

      if (focusOnMount) focusOnTab(0)
    }
  }, [focusOnMount, menuOpen])

  return (
    <div
      className={className}
      data-testid="focus-trapper"
      ref={focusTrapRef}
      role="presentation"
      onClick={handleTabReset}
      onKeyDown={handleFocusTrap}
    >
      {children}
    </div>
  )
}
