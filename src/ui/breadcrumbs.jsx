import clsx from "clsx"
import Link from 'next/link'

function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav className="text-sm  breadcrumbs">
      <ol>
        {breadcrumbs.map(({ label, href, active }, index) => (
          <li
            className={clsx({ 'breadcrumbs-active text-primary': active })}
            aria-current={active}
            key={href}
          >
          <Link href={href}>
            {label}
          </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
