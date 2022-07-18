import type { AccessibleElement } from '../types'

export const ACCESSIBLE_ELEMENTS = ['a', 'button:not(:disabled)', '[tabindex]']

export function isFocusable(
  element: AccessibleElement,
  options: { ignoreTabIndex?: boolean; ignoreHrefAttr?: boolean } = {}
) {
  const { disabled, href, nodeName, rel, tabIndex, type } = element

  if (typeof tabIndex === 'number' && !options.ignoreTabIndex)
    return tabIndex >= 0
  if (disabled) return false

  switch (nodeName) {
    case 'A':
      return (!!href && !options.ignoreHrefAttr) || rel !== 'ignore'
    case 'INPUT':
      return type !== 'hidden'
    case 'BUTTON':
      return true
    default:
      return false
  }
}
