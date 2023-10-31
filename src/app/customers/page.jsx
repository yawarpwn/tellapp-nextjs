import { fetchCustomersPages } from '@/lib/customers-data'
import SearchCustomers from '@/ui/customers/search'
import CustomersTable from '@/ui/customers/table'
import Pagination from '@/ui/pagination'
import { Suspense } from 'react'
export default async function CustomersPage({ searchParams}) {
  const currentPage = Number(searchParams?.page) || 1
  const query = searchParams?.query || ''
  const totalPage = await fetchCustomersPages(query)

  return (
    <main>
      <header>
        <SearchCustomers />
      </header>
      <Suspense fallback={'Loading...'}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
    <Pagination totalPages={totalPage} />
    </main>
  )
}
