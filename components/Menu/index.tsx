import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import Chevron from '../Chevron'
import FocusTrap from '../FocusTrap'

export default function Menu({
  title,
  options
}: {
  title: string
  options: Array<{ href: string; title: string }>
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleToggleMenu = () => {
    setMenuOpen((p) => !p)
  }

  const handleMenuClose = () => {
    setMenuOpen(false)
  }

  return (
    <FocusTrap onEscapePress={handleMenuClose} rebuildTabList={[menuOpen]}>
      <button
        type="button"
        id={`${title}-menu-button`}
        className="text-xl my-2"
        aria-controls={`${title}-menu`}
        aria-expanded={menuOpen}
        aria-haspopup={true}
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
      {menuOpen && (
        <ul
          id={`${title}-menu`}
          role="menu"
          aria-labelledby={`${title}-menu-button`}
        >
          {options.map(({ href, title }) => (
            <li key={title} role="presentation" className="p-2">
              <Link href={href}>
                <a className="hover:underline" tabIndex={-1} role="menuitem">
                  {title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </FocusTrap>
  )
}
