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
    prevState: FocusTrapperState
  ) {
    const { tabIndex } = this.state
    const { menuOpen } = this.props
    if (tabIndex !== prevState.tabIndex && this.tabbableItems.length > 0) {
      this.tabbableItems[tabIndex]?.focus()
    }

    if (
      this.focusTrapRef.current &&
      menuOpen &&
      menuOpen !== prevProps.menuOpen
    ) {
      this.handleInit()
    }
  }

  handleInit = () => {
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

  handleFocusTrap = (event: KeyboardEvent<HTMLElement>) => {
    const { key } = event
    if (key === 'Enter') {
      this.handleInit()
      return
    }

    const arrowUp = key === 'ArrowUp'
    const arrowDown = key === 'ArrowDown'
    const escKey = key === 'Escape' || key === 'Esc'
    const tabPress = key === 'Tab'
    const tabItemsLength = this.tabbableItems.length - 1

    if (arrowUp) {
      event.preventDefault()
      this.setState((prevState) => ({
        tabIndex: prevState.tabIndex - 1 < 0 ? 0 : prevState.tabIndex - 1
      }))
    } else if (arrowDown) {
      event.preventDefault()
      this.setState((prevState) => ({
        tabIndex:
          prevState.tabIndex + 1 > tabItemsLength
            ? tabItemsLength
            : prevState.tabIndex + 1
      }))
    } else if (tabPress) {
      this.resetTabIndex()
    } else if (escKey) {
      event.stopPropagation()
      this.tabbableItems[0]?.focus()
      this.resetTabIndex()
      this.props.onEscapePress()
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
