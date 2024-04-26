import React from 'react'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

import Link from 'next/link'

type Props = {
	breadcrumbs: {
		label: string
		href?: string
		active?: boolean
	}[]
}
function Breadcrumbs({ breadcrumbs }: Props) {
	return (
		<Breadcrumb className='text-sm  breadcrumbs'>
			<BreadcrumbList>
				{breadcrumbs.map(({ label, href, active }, index) => (
					active
						? (
							<React.Fragment
								key={href}
							>
								<BreadcrumbItem
									aria-current={active}
								>
									<span>
										{label}
									</span>
								</BreadcrumbItem>
							</React.Fragment>
						)
						: (
							<React.Fragment
								key={href}
							>
								<BreadcrumbItem>
									<Link href={href}>{label}</Link>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</React.Fragment>
						)
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default Breadcrumbs
