/* istanbul ignore file */
export type { AppProps } from 'next/app'
export type {
  ChangeEvent,
  ComponentType,
  DependencyList,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  Ref
} from 'react'

type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : any

type Filter<T, U> = T extends U ? T : never

export type InferNextProps<T> = Filter<
  AsyncReturnType<T>,
  { props: any }
>['props']

export interface AccessibleNode extends Node {
  readonly type?: string
  readonly href?: string
  readonly disabled?: boolean
  readonly rel?: string
  readonly tabIndex?: number
}
