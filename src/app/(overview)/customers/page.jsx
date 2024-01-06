import { fetchCustomersPages } from '@/lib/customers-data'
import { AddButton } from '@/ui/buttons'
import CustomersTable from '@/ui/customers/table'
import Pagination from '@/ui/pagination'
import Search from '@/ui/search'
import { Suspense } from 'react'

export default async function CustomersPage({ searchParams }) {
	const currentPage = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const totalPage = await fetchCustomersPages(query)

	return (
		<>
			<header className='flex items-center justify-between'>
				<Search />
				<AddButton href='/customers/create' />
			</header>
			<Suspense fallback={'Loading...'}>
				<CustomersTable query={query} currentPage={currentPage} />
			</Suspense>
			<Pagination totalPages={totalPage} />
		</>
	)
}
