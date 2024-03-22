import { fetchAgenciesPages } from '@/lib/data/agencies'
import { PageProps } from '@/types'
import { AddFormAgency } from '@/ui/agencies'
import AgenciesTable from '@/ui/agencies/table'
import Pagination from '@/ui/pagination'
import Search from '@/ui/search'
import { TableSkeleton } from '@/ui/skeletons/table-skeleton'
import { Suspense } from 'react'
async function AgenciesPage({ searchParams }: PageProps) {
	const page = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const totalPages = await fetchAgenciesPages(query)
	return (
		<>
			<header className='flex itmes-center justify-between mb-4'>
				<Search searchValue={query} />
				<AddFormAgency />
				{/* <AddButton href='/agencies/create' /> */}
			</header>
			<Suspense key={query} fallback={<TableSkeleton />}>
				<AgenciesTable query={query} currentPage={page} />
			</Suspense>
			<Pagination totalPages={totalPages} />
		</>
	)
}

export default AgenciesPage
