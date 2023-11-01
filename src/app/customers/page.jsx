import { fetchCustomersPages } from '@/lib/customers-data'
import SearchCustomers from '@/ui/customers/search'
import CustomersTable from '@/ui/customers/table'
import Pagination from '@/ui/pagination'
import { PlusIcon } from '@/icons'
import { Suspense } from 'react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export default async function CustomersPage({ searchParams }) {
  const currentPage = Number(searchParams?.page) || 1
  const query = searchParams?.query || ''
  const totalPage = await fetchCustomersPages(query)

  return (
    <>
      <header className="flex items-center justify-between">
        <SearchCustomers />
        <Link className="btn" href='/customers/create'>
          <PlusIcon />
          <span className="hidden md:block">Crear</span>
        </Link>
      </header>
      <Suspense fallback={'Loading...'}>
        <CustomersTable query={query} currentPage={currentPage} />
      </Suspense>
      <Pagination totalPages={totalPage} />
    </>
  )
}
