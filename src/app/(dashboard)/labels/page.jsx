import { AddButton } from '@/ui/buttons'
import Search from '@/ui/search'
import Pagination from '@/ui/pagination'
import { Suspense } from 'react'
import { fetchFilteredLabels, fetchLabelsPages } from '@/lib/labels-data'
import LabelsTable from '@/ui/labels/table'
async function LabelsPage({ searchParams }) {
	const totalPages = await fetchLabelsPages()
	const query = searchParams?.query || ''
	const currentPage = Number(searchParams?.page || 1)
	return (
		<>
			<header className="flex items-center justify-between">
				<Search placeholder="Buscar destinatario" />
				<AddButton href="/labels/create" />
			</header>
			<Suspense fallback={'Loading...'}>
				<LabelsTable currentPage={currentPage} query={query} />
			</Suspense>
			<Pagination totalPages={totalPages} />
		</>
	)
}

export default LabelsPage
