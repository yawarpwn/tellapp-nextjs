import { AddButton } from '@/ui/buttons'
import Search from '@/ui/search'
import Pagination from '@/ui/pagination'
import Labels from '@/ui/labels/labels'
import { Suspense } from 'react'
import { fetchFilteredLabels, fetchLabelsPages } from '@/lib/labels-data'
async function LabelsPage({ searchParams }) {
  const totalPages = await fetchLabelsPages()
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page || 1)
  const labels = await fetchFilteredLabels({ query, currentPage })
  return (
    <>
      <header className="flex items-center justify-between">
        <Search placeholder="Buscar destinatario" />
        <AddButton href="/labels/create" />
      </header>
      <Suspense fallback={'Loading...'}>
        <Labels labels={labels} />
      </Suspense>
      <Pagination totalPages={totalPages} />
    </>
  )
}

export default LabelsPage
