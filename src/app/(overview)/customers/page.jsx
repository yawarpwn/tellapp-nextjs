import { fetchCustomersPages } from '@/lib/data/customers'
import { AddCustomerForm } from '@/ui/customers'
import CustomersTable from '@/ui/customers/table'
import Pagination from '@/ui/pagination'
import Search from '@/ui/search'
import { TableSkeleton } from '@/ui/skeletons/table-skeleton'
import { Suspense } from 'react'

export default async function CustomersPage({ searchParams }) {
	const currentPage = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const totalPage = await fetchCustomersPages(query)

	return (
		<>
			<header className='flex gap-2 items-center justify-between mb-4'>
				<Search />
				<AddCustomerForm />
			</header>
			<Suspense fallback={<TableSkeleton />}>
				<CustomersTable query={query} currentPage={currentPage} />
			</Suspense>
			<Pagination totalPages={totalPage} />
		</>
	)
}
