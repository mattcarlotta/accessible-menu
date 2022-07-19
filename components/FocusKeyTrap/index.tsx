import { useCallback, useEffect, useRef } from 'react'
import type { KeyboardEvent, ReactNode } from '../../types'
import type { NodeIsFocusableOptions } from '../../utils/accessibilityHelpers'
import findAccessibleNodes, {
  ACCESSIBLE_NODES
} from '../../utils/accessibilityHelpers'

export type FocusTrapMenuProps = {
  children: ReactNode
  className?: string
  onKeyPressOpenMenu: () => void
  onEscapePress: () => void
  menuOpen: boolean
  options?: NodeIsFocusableOptions
  orientation?: 'vertical' | 'horizontal'
}

export type InitalTabIndex = 'first' | 'last' | ''

export default function FocusTrapMenu({
  children,
  className,
  onEscapePress,
  onKeyPressOpenMenu,
  menuOpen,
  options = {},
  orientation = 'vertical'
}: FocusTrapMenuProps) {
  const tabIndex = useRef<number>(0)
  const initialTabIndex = useRef<InitalTabIndex>('')
  const focusTrapRef = useRef<HTMLDivElement | null>(null)
  const tabbableItemsRef = useRef<Array<HTMLElement>>([])

  const resetInitialTabIndex = useCallback(() => {
    initialTabIndex.current = ''
  }, [])

  const focusOnTab = useCallback(
    (index: number) => {
      tabbableItemsRef.current[index]?.focus()
      tabIndex.current = index
      resetInitialTabIndex()
    },
    [resetInitialTabIndex]
  )

  const setMenuItems = useCallback(
    (initialIndex: InitalTabIndex) => {
      if (focusTrapRef.current) {
        const nodes = focusTrapRef.current.querySelectorAll(
          ACCESSIBLE_NODES.join(',')
        )
        tabbableItemsRef.current = findAccessibleNodes(nodes, options)
        if (initialIndex) {
          focusOnTab(
            initialIndex === 'first' ? 1 : tabbableItemsRef.current.length - 1
          )
        }
      }
    },
    [focusOnTab, options]
  )

  const handleTabReset = () => {
    tabIndex.current = 0
    resetInitialTabIndex()
  }

  const handleFocusTrap = (event: KeyboardEvent<HTMLElement>) => {
    const isVertical = orientation === 'vertical'
    const tabItemsLength = tabbableItemsRef.current.length - 1

    switch (event.key) {
      case '': {
        if (!menuOpen) onKeyPressOpenMenu()
        break
      }
      case 'ArrowUp':
      case 'ArrowLeft': {
        if (
          (!isVertical && event.key === 'ArrowUp') ||
          (isVertical && event.key === 'ArrowLeft')
        )
          break
        event.preventDefault()
        if (!menuOpen) {
          initialTabIndex.current = 'last'
          onKeyPressOpenMenu()
          break
        }
        focusOnTab(tabIndex.current - 1 < 0 ? 0 : tabIndex.current - 1)
        break
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        if (
          (!isVertical && event.key === 'ArrowDown') ||
          (isVertical && event.key === 'ArrowRight')
        )
          break
        event.preventDefault()
        if (!menuOpen) {
          initialTabIndex.current = 'first'
          onKeyPressOpenMenu()
          break
        }
        focusOnTab(
          tabIndex.current + 1 > tabItemsLength
            ? tabItemsLength
            : tabIndex.current + 1
        )
        break
      }
      case 'Escape':
      case 'Esc': {
        event.stopPropagation()
        focusOnTab(0)
        onEscapePress()
        break
      }
      case 'Tab': {
        handleTabReset()
        break
      }
      default:
        break
    }
  }

  useEffect(() => {
    if (menuOpen) setMenuItems(initialTabIndex.current)
  }, [focusOnTab, menuOpen, setMenuItems])

  return (
    <div
      className={className}
      ref={focusTrapRef}
      role="presentation"
      onClick={handleTabReset}
      onKeyDown={handleFocusTrap}
    >
      {children}
    </div>
  )
}
