import { fetchQuotationsPages } from '@/lib/data/quotations'
import { AddButton } from '@/ui/buttons'
import Pagination from '@/ui/pagination'
import QuotationsTable from '@/ui/quotations/table'
import Search from '@/ui/search'
import { QuotationsTableSkeleton } from '@/ui/skeletons/quotations'
import { Suspense } from 'react'
async function QuotationsPage({ searchParams }: {
	searchParams?: {
		page?: string
		query?: string
	}
}) {
	const page = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const totalPages = await fetchQuotationsPages({ query })
	return (
		<>
			<header className='flex items-center justify-between gap-2'>
				<Search />
				<AddButton href={'/quotations/create'} />
			</header>
			<Suspense fallback={<QuotationsTableSkeleton />}>
				{/* <QuotationsTableSkeleton /> */}
				<QuotationsTable
					key={`quotations-${page}`}
					query={query}
					currentPage={page}
				/>
			</Suspense>
			<Pagination totalPages={totalPages} />
		</>
	)
}

export default QuotationsPage
