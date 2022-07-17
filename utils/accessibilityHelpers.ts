import type { AccessibleElement } from '../types'

export const ACCESSIBLE_ELEMENTS = ['a', 'button:not(:disabled)', '[tabindex]']

export function isFocusable(
  element: AccessibleElement,
  { ignoreTabIndex }: { ignoreTabIndex?: boolean; ignoreHrefAttr?: boolean }
) {
  const { disabled, href, nodeName, rel, tabIndex, type } = element

  if (typeof tabIndex === 'number' && !ignoreTabIndex) return tabIndex >= 0
  if (disabled) return false

  switch (nodeName) {
    case 'A':
      return (!!href && !ignoreTabIndex) || rel !== 'ignore'
    case 'INPUT':
      return type !== 'hidden'
    case 'BUTTON':
      return true
    default:
      return false
  }
}
