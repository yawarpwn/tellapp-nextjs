import AgenciesTable from '@/ui/agencies/table'
import Search from '@/ui/search'
import { AddButton } from '@/ui/buttons'
import { fetchAgenciesPages } from '@/lib/agencies-data'
async function AgenciesPage({ searchParams }) {
  const page = Number(searchParams?.page) || 1
  const query = searchParams?.query || ''
  // const totalPages = await fetchAgenciesPages(query)
  return (
    <>
      <header className="flex itmes-center justify-between">
        <Search />
        <AddButton href="/agencies/create" />
      </header>
      <AgenciesTable query={query} currentPage={page} />
    </>
  )
}

export default AgenciesPage
