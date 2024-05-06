import { GalleryAddFormButton } from '@/components/gallery/gallery-buttons'
import { GalleryTable } from '@/components/gallery/gallery-table'
import { Pagination } from '@/components/pagination'
import Search from '@/components/search'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import { fetchGalleryPages } from '@/lib/data/gallery'
import { PageProps } from '@/types'
import { Suspense } from 'react'

export default async function Page(
	{ searchParams }: PageProps,
) {
	const page = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const totalPages = await fetchGalleryPages(query)

	return (
		<div>
			<header className='flex items-center justify-between gap-2 mb-4'>
				<Search placeholder='Buscar foto...' searchValue={query} />
				<GalleryAddFormButton />
			</header>
			<Suspense key={query} fallback={<TableSkeleton />}>
				<GalleryTable currentPage={page} query={query} />
			</Suspense>
			{/* <GalleryImagesList title={'Galeria'} images={galleryImages} /> */}
			<Pagination totalPages={totalPages} />
		</div>
	)
}
