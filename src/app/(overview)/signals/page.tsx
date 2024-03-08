import { fetchSignalsPages } from '@/lib/data/signals'
import Pagination from '@/ui/pagination'
import { AddProductForm } from '@/ui/products'
import Search from '@/ui/search'
import { SignalsTable } from '@/ui/signals/table'
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
			<header className='flex items-center gap-2 justify-between'>
				<Search placeholder='Buscar Señal...' />
				<AddProductForm />
			</header>
			<Suspense>
				<SignalsTable currentPage={page} query={query} />
			</Suspense>
			<Pagination totalPages={totalPages} />
		</div>
	)
}
