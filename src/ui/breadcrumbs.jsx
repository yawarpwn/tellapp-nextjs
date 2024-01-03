import clsx from 'clsx'
import Link from 'next/link'

function Breadcrumbs({ breadcrumbs }) {
	return (
		<nav className='text-sm  breadcrumbs'>
			<ol>
				{breadcrumbs.map(({ label, href, active }, index) => (
					active
						? (
							<li
								className='breadcrumbs-active font-bold'
								key={href}
								aria-current={active}
							>
								<span>
									{label}
								</span>
							</li>
						)
						: (
							<li
								key={href}
							>
								<Link href={href}>{label}</Link>
							</li>
						)
				))}
			</ol>
		</nav>
	)
}

export default Breadcrumbs
