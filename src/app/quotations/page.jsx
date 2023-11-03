import { fetchQuotationsPages } from "@/lib/quotations-data"
import Search from "@/ui/search"
import { AddButton } from "@/ui/buttons"
import QuotationsTable from "@/ui/quotations/table"
import Pagination from "@/ui/pagination"
async function QuotationsPage({ searchParams}) {
  const page = Number(searchParams?.page) || 1
  const query = searchParams?.query || ''
  const totalPages = await fetchQuotationsPages({query})

  return (
    <>
    <header className="flex items-center justify-between">
    <Search />
    <AddButton href={'/quotations/crear'} />
    </header>
    <QuotationsTable query={query} currentPage={page} />
    <Pagination  totalPages={totalPages} />
    </>
  )
}

export default QuotationsPage
