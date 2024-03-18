import { fetchSignalsPages } from '@/lib/data/signals'
import Pagination from '@/ui/pagination'
import Search from '@/ui/search'
import { SignalAddFormButton } from '@/ui/signals/signal-button'
import { SignalsTable } from '@/ui/signals/table'
import { TableSkeleton } from '@/ui/skeletons/table-skeleton'
import { Suspense } from 'react'

export default async function Page({ searchParams }: {
	searchParams?: {
		query?: string
		page?: string
	}
}) {
	const page = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''

	const totalPages = await fetchSignalsPages(query)
	return (
		<div>
			<header className='flex items-center gap-2 justify-between mb-4'>
				<Search placeholder='Buscar Señal...' />
				<SignalAddFormButton />
			</header>
			<Suspense fallback={<TableSkeleton />}>
				<SignalsTable currentPage={page} query={query} />
			</Suspense>
			<Pagination totalPages={totalPages} />
		</div>
	)
}
