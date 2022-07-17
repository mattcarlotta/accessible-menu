import type { AccessibleElement } from '../types'

export const ACCESSIBLE_ELEMENTS = ['a', 'button:not(:disabled)', '[tabindex]']

export function isFocusable(element: AccessibleElement) {
  const { disabled, nodeName, rel, type } = element

  // if (typeof tabIndex === 'number') return tabIndex >= 0
  if (disabled) return false

  switch (nodeName) {
    case 'A':
      return rel !== 'ignore'
    case 'INPUT':
      return type !== 'hidden'
    case 'BUTTON':
      return true
    default:
      return false
  }
}
