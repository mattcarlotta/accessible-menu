import styles from './SummaryMenu.module.scss'

export default function SummaryMenu({
  defaultOpen = false,
  title,
  options
}: {
  defaultOpen?: boolean
  title: string
  options: Array<{ href: string; title: string }>
}) {
  return (
    <details className={styles.details} open={defaultOpen}>
      <summary className="cursor-pointer text-xl">
        <span className="inline-block py-2 pr-5">{title}</span>
      </summary>
      <ul>
        {options.map(({ href, title }) => (
          <li key={title} className="py-0.5 pl-2">
            <a
              role="button"
              className="inline-block py-2"
              tabIndex={0}
              href={href}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </details>
  )
}
