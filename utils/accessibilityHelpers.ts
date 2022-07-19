import type { AccessibleNode } from '../types'

export const ACCESSIBLE_NODES = ['a', 'button:not(:disabled)', '[tabindex]']

export type NodeIsFocusableOptions = {
  ignoreTabIndex?: boolean
  ignoreHrefAttr?: boolean
}

export function nodeIsAccessible(
  element: AccessibleNode,
  options: NodeIsFocusableOptions = {}
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

export default function findAccessibleNodes(
  nodes: NodeListOf<Element>,
  options?: NodeIsFocusableOptions
) {
  return Array.from(nodes).filter((node) =>
    nodeIsAccessible(node, options)
  ) as HTMLElement[]
}
