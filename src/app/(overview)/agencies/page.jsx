import { fetchAgenciesPages } from '@/lib/agencies-data'
import { AddFormAgency } from '@/ui/agencies'
import AgenciesTable from '@/ui/agencies/table'
import { AddButton } from '@/ui/buttons'
import Pagination from '@/ui/pagination'
import Search from '@/ui/search'
import { Suspense } from 'react'
async function AgenciesPage({ searchParams }) {
	const page = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const totalPages = await fetchAgenciesPages(query)
	return (
		<>
			<header className='flex itmes-center justify-between'>
				<Search />
				<AddFormAgency />
				{/* <AddButton href='/agencies/create' /> */}
			</header>
			<Suspense fallback={'Cargando...'}>
				<AgenciesTable query={query} currentPage={page} />
			</Suspense>
			<Pagination currentPage={page} totalPages={totalPages} />
		</>
	)
}

export default AgenciesPage
