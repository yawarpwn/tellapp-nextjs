'use client'
import { ArrowLeft, ArrowRight } from '@/icons'
import { generatePagination } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
function Pagination({ totalPages }) {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const currentPage = Number(searchParams.get('page') || 1)
	const allPages = generatePagination(currentPage, totalPages)

	const createPageURL = pageNumber => {
		const params = new URLSearchParams(pathname)
		params.set('page', pageNumber.toString())
		return `${pathname}?${params.toString()}`
	}

	return (
		<div className='flex items-center justify-center'>
			<PaginationArrow
				href={createPageURL(currentPage - 1)}
				direction='left'
				isDisabled={currentPage <= 1}
			/>
			<div className='join'>
				{allPages.map((page, index) => {
					let position

					if (index === 0) position = 'first'
					if (index === allPages.length - 1) position = 'last'
					if (allPages.length === 1) position = 'single'
					if (page === '...') position = 'middle'

					return (
						<PaginationNumber
							key={page}
							href={createPageURL(page)}
							page={page}
							position={position}
							isActive={page === currentPage}
						/>
					)
				})}
			</div>
			<PaginationArrow
				direction='right'
				href={createPageURL(currentPage + 1)}
				isDisabled={currentPage >= totalPages}
			/>
		</div>
	)
}

function PaginationArrow({ href, direction, isDisabled }) {
	const icon = direction === 'left' ? <ArrowLeft /> : <ArrowRight />

	return isDisabled
		? <div className='btn btn-sm btn-disabled'>{icon}</div>
		: (
			<Link href={href} className='btn btn-sm'>
				{icon}
			</Link>
		)
}

function PaginationNumber({ isActive, href, position, page }) {
	const className = clsx('join-item btn btn-sm', {
		'btn-active': isActive,
	})
	return isActive
		? <div className={className}>{page}</div>
		: (
			<Link className={className} href={href}>
				{page}
			</Link>
		)
}

export default Pagination
