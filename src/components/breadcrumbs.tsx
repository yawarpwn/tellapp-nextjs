import clsx from 'clsx'

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
		href: string
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
							<>
								<BreadcrumbItem
									className='breadcrumbs-active font-bold'
									key={href}
									aria-current={active}
								>
									<span>
										{label}
									</span>
								</BreadcrumbItem>
							</>
						)
						: (
							<>
								<BreadcrumbItem
									key={href}
								>
									<Link href={href}>{label}</Link>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
							</>
						)
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

export default Breadcrumbs
