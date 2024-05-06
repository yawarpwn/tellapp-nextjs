import { AddButton } from '@/components/buttons'
import LabelsTable from '@/components/labels/table'
import Pagination from '@/components/pagination'
import Search from '@/components/search'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import { fetchLabelsPages } from '@/lib/data/labels'
import { PageProps } from '@/types'
import { Suspense } from 'react'

async function LabelsPage(
	{ searchParams }: PageProps,
) {
	const totalPages = await fetchLabelsPages()
	const query = searchParams?.query || ''
	const currentPage = Number(searchParams?.page || 1)
	return (
		<>
			<header className='flex items-center justify-between mb-4'>
				<Search placeholder='Buscar destinatario' searchValue={query} />
				<AddButton href='/labels/create' />
			</header>
			<Suspense key={query} fallback={<TableSkeleton />}>
				<LabelsTable currentPage={currentPage} query={query} />
			</Suspense>
			<Pagination totalPages={totalPages} />
		</>
	)
}

export default LabelsPage
