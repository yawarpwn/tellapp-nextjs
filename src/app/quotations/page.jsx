import fs from 'node:fs'
import {
  fetchFilteredQuotations,
  fetchQuotationsPages,
} from '@/lib/quotations-data'
import Search from '@/ui/search'
import { AddButton } from '@/ui/buttons'
import QuotationsTable from '@/ui/quotations/table'
import Pagination from '@/ui/pagination'
import { Suspense } from 'react'
async function QuotationsPage({ searchParams }) {
  const page = Number(searchParams?.page) || 1
  const query = searchParams?.query || ''
  const totalPages = await fetchQuotationsPages({ query })

  return (
    <>
      <header className="flex items-center justify-between">
        <Search />
        <AddButton href={'/quotations/create'} />
      </header>
      <Suspense fallback={'Loading...'}>
        <QuotationsTable query={query} currentPage={page} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </>
  )
}

export default QuotationsPage
