import { fetchQuotationsPages } from '@/lib/quotations-data'
import { AddButton } from '@/ui/buttons'
import Pagination from '@/ui/pagination'
import QuotationsTable from '@/ui/quotations/table'
import Search from '@/ui/search'
import { QuotationsTableSkeleton } from '@/ui/skeletons/quotations'
import { Suspense } from 'react'
async function QuotationsPage({ searchParams }) {
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
				<QuotationsTable query={query} currentPage={page} />
				{/* <QuotationsTableSkeleton /> */}
			</Suspense>
			<Pagination totalPages={totalPages} />
		</>
	)
}

export default QuotationsPage
