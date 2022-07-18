import { useEffect, useRef, useState } from 'react'
import type { AccessibleElement, KeyboardEvent, ReactNode } from '../../types'
import {
  ACCESSIBLE_ELEMENTS,
  isFocusable
} from '../../utils/accessibilityHelpers'

export type FocusTrapperState = {
  tabIndex: number
}

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
  const [tabIndex, setTabIndex] = useState(0)
  const focusTrapRef = useRef<HTMLDivElement | null>(null)
  const tabbableItemsRef = useRef<Array<HTMLElement>>([])

  const focusOnTab = (tabIndex: number) => {
    tabbableItemsRef.current?.[tabIndex]?.focus()
    setTabIndex(tabIndex)
  }

  const handleFocusTrap = (event: KeyboardEvent<HTMLElement>) => {
    const { key } = event
    const arrowUpKey = key === 'ArrowUp'
    const arrowDownKey = key === 'ArrowDown'
    const escKey = key === 'Escape' || key === 'Esc'
    const tabKey = key === 'Tab'
    const tabItemsLength = tabbableItemsRef.current.length - 1

    if (arrowUpKey) {
      event.preventDefault()
      focusOnTab(tabIndex - 1 < 0 ? 0 : tabIndex - 1)
      return
    } else if (arrowDownKey) {
      event.preventDefault()
      focusOnTab(tabIndex + 1 > tabItemsLength ? tabItemsLength : tabIndex + 1)
      return
    } else if (tabKey) {
      setTabIndex(0)
      return
    } else if (escKey) {
      event.stopPropagation()
      focusOnTab(0)
      onEscapePress()
      return
    }
  }

  useEffect(() => {
    if (focusTrapRef.current) {
      const tabbableItems = Array.from(
        focusTrapRef.current.querySelectorAll(ACCESSIBLE_ELEMENTS.join(','))
      ).filter((element) =>
        isFocusable(element as AccessibleElement, {
          ignoreTabIndex: true,
          ignoreHrefAttr: true
        })
      )

      tabbableItemsRef.current = tabbableItems as Array<HTMLElement>
      if (focusOnMount) tabbableItemsRef.current[0]?.focus()
    }
  }, [menuOpen, focusOnMount])

  return (
    <div
      data-testid="focus-trapper"
      role="presentation"
      className={className}
      ref={focusTrapRef}
      onKeyDown={handleFocusTrap}
    >
      {children}
    </div>
  )
}
