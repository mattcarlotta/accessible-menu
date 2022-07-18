import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import type { ReactNode } from '../../types'
import Chevron from '../Chevron'
import FocusKeyTrap from '../FocusKeyTrap'

export function Menu({
  className,
  children,
  isOpen,
  id,
  title
}: {
  className?: string
  children: ReactNode
  id: string
  isOpen?: boolean
  title: string
}) {
  return isOpen ? (
    <ul
      id={id}
      className={className}
      role="menu"
      aria-labelledby={`${id}-button`}
      aria-orientation="vertical"
    >
      {children}
    </ul>
  ) : null
}

export function MenuItem({
  className,
  href,
  title
}: {
  className?: string
  href: string
  title: string
}) {
  return (
    <li key={title} role="presentation" className={className}>
      <Link href={href}>
        <a className="hover:underline" tabIndex={-1} role="menuitem">
          {title}
        </a>
      </Link>
    </li>
  )
}

export default function CollapsibleMenu({
  title,
  options
}: {
  title: string
  options: Array<{ href: string; title: string }>
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const titleMenu = `${title}-menu`.toLowerCase()

  const handleToggleMenu = () => {
    setMenuOpen((p) => !p)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  return (
    <FocusKeyTrap menuOpen={menuOpen} onEscapePress={handleMenuClose}>
      <button
        type="button"
        id={`${titleMenu}-button`}
        className="text-xl my-2"
        aria-controls={titleMenu}
        aria-expanded={menuOpen}
        onClick={handleToggleMenu}
      >
        <span className="pr-4">{title}</span>
        <Chevron
          className={clsx(
            'inline h-3 w-4 transition-transform',
            menuOpen && 'rotate-90'
          )}
        />
      </button>
      <Menu id={titleMenu} isOpen={menuOpen} title={title}>
        {options.map((props) => (
          <MenuItem key={props.title} className="p-2" {...props} />
        ))}
      </Menu>
    </FocusKeyTrap>
  )
}
