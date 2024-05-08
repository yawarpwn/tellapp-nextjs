import { AddCustomerForm } from '@/components/customers'
import CustomersTable from '@/components/customers/table'
import Pagination from '@/components/pagination'
import Search from '@/components/search'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import { fetchCustomersPages } from '@/lib/data/customers'
import { Suspense } from 'react'

export default async function CustomersPage(
	{ searchParams }: { searchParams?: { page?: string; query?: string } },
) {
	const currentPage = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const totalPage = await fetchCustomersPages(query)

	return (
		<>
			<header className='flex gap-2 items-center justify-between mb-4'>
				<Search placeholder='Buscar Cliente...' searchValue={query} />
				<AddCustomerForm />
			</header>
			<Suspense key={query} fallback={<TableSkeleton />}>
				<CustomersTable query={query} currentPage={currentPage} />
			</Suspense>
			<Pagination totalPages={totalPage} />
		</>
	)
}
