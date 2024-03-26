import { fetchQuotationsPages } from '@/lib/data/quotations'
import { AddButton } from '@/components/buttons'
import Pagination from '@/components/pagination'
import QuotationsTable from '@/components/quotations/table'
import Search from '@/components/search'
import { QuotationsTableSkeleton } from '@/components/skeletons/quotations'
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
			<header className='flex items-center justify-between gap-2 mb-4'>
				<Search placeholder='Buscar Cotización' searchValue={query} />
				<AddButton href={'/quotations/create'} />
			</header>
			<Suspense
				key={query}
				fallback={<QuotationsTableSkeleton />}
			>
				<QuotationsTable
					query={query}
					currentPage={page}
				/>
			</Suspense>
			<Pagination totalPages={totalPages} />
		</>
	)
}

export default QuotationsPage
