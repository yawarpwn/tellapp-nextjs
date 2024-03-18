import { fetchLabelsPages } from '@/lib/data/labels'
import { AddButton } from '@/ui/buttons'
import LabelsTable from '@/ui/labels/table'
import Pagination from '@/ui/pagination'
import Search from '@/ui/search'
import { TableSkeleton } from '@/ui/skeletons/table-skeleton'
import { Suspense } from 'react'
async function LabelsPage({ searchParams }) {
	const totalPages = await fetchLabelsPages()
	const query = searchParams?.query || ''
	const currentPage = Number(searchParams?.page || 1)
	return (
		<>
			<header className='flex items-center justify-between'>
				<Search placeholder='Buscar destinatario' />
				<AddButton href='/labels/create' />
			</header>
			<Suspense fallback={<TableSkeleton />}>
				<LabelsTable currentPage={currentPage} query={query} />
			</Suspense>
			<Pagination totalPages={totalPages} />
		</>
	)
}

export default LabelsPage
