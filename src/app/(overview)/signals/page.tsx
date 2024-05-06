import Pagination from '@/components/pagination'
import Search from '@/components/search'
import { SignalAddFormButton } from '@/components/signals/signal-button'
import { SignalsTable } from '@/components/signals/table'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import { fetchSignalsPages } from '@/lib/data/signals'
import { PageProps } from '@/types'
import { Suspense } from 'react'

export default async function Page({ searchParams }: PageProps) {
	const page = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''

	const totalPages = await fetchSignalsPages(query)
	return (
		<div>
			<header className='flex items-center gap-2 justify-between mb-4'>
				<Search searchValue={query} placeholder='Buscar Señal...' />
				<SignalAddFormButton />
			</header>
			<Suspense key={query} fallback={<TableSkeleton />}>
				<SignalsTable currentPage={page} query={query} />
			</Suspense>
			<Pagination totalPages={totalPages} />
		</div>
	)
}
