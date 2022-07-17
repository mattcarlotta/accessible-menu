import { Component, createRef } from 'react'
import { AccessibleElement, KeyboardEvent, ReactNode } from '../../types'
import {
  ACCESSIBLE_ELEMENTS,
  isFocusable
} from '../../utils/accessibilityHelpers'

export type FocusTrapperState = {
  tabIndex: number
}

export type FocusTrapperProps = {
  children: ReactNode
  className?: string
  onEscapePress: () => void
  onEnterPress: () => void
  menuOpen: boolean
}

export default class FocusTrapper extends Component<
  FocusTrapperProps,
  FocusTrapperState
> {
  state = {
    tabIndex: 0
  }

  focusTrapRef = createRef<HTMLDivElement>()

  tabbableItems = [] as Array<HTMLElement>

  componentDidUpdate(
    prevProps: FocusTrapperProps,
    _prevState: FocusTrapperState
  ) {
    const { menuOpen } = this.props

    if (this.focusTrapRef.current && menuOpen !== prevProps.menuOpen) {
      this.initTababbleElements()
    }
  }

  initTababbleElements = () => {
    if (this.focusTrapRef.current) {
      const tabbableItems = Array.from(
        this.focusTrapRef.current.querySelectorAll(
          ACCESSIBLE_ELEMENTS.join(',')
        )
      ).filter((element) => isFocusable(element as AccessibleElement))

      this.tabbableItems = tabbableItems as Array<HTMLElement>
      this.setState({ tabIndex: 0 })
    }
  }

  resetTabIndex = () => {
    this.setState({ tabIndex: 0 })
  }

  focusOnTab = (tabIndex: number) => {
    this.tabbableItems[tabIndex]?.focus()
    this.setState({ tabIndex })
  }

  handleFocusTrap = (event: KeyboardEvent<HTMLElement>) => {
    if (!this.props.menuOpen) return
    const { key } = event
    const { tabIndex } = this.state
    const arrowUpKey = key === 'ArrowUp'
    const arrowDownKey = key === 'ArrowDown'
    const escKey = key === 'Escape' || key === 'Esc'
    const tabKey = key === 'Tab'
    const tabItemsLength = this.tabbableItems.length - 1
    let nextTabIndex = -1

    if (arrowUpKey) {
      event.preventDefault()
      nextTabIndex = tabIndex - 1 < 0 ? 0 : tabIndex - 1
    } else if (arrowDownKey) {
      event.preventDefault()
      nextTabIndex =
        tabIndex + 1 > tabItemsLength ? tabItemsLength : tabIndex + 1
    } else if (tabKey) {
      this.resetTabIndex()
      return
    } else if (escKey) {
      event.stopPropagation()
      this.focusOnTab(0)
      this.props.onEscapePress()
      return
    }

    if (nextTabIndex >= 0) {
      this.focusOnTab(nextTabIndex)
    }
  }

  render() {
    return (
      <div
        data-testid="focus-trapper"
        role="presentation"
        className={this.props.className}
        ref={this.focusTrapRef}
        onKeyDown={this.handleFocusTrap}
      >
        {this.props.children}
      </div>
    )
  }
}
