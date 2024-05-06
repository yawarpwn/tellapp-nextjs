import { AddFormAgency } from '@/components/agencies'
import AgenciesTable from '@/components/agencies/table'
import Pagination from '@/components/pagination'
import Search from '@/components/search'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import { fetchAgenciesPages } from '@/lib/data/agencies'
import { PageProps } from '@/types'
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
