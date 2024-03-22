import { fetchGalleryPages } from '@/lib/data/gallery'
import { PageProps } from '@/types'
import { GalleryAddFormButton } from '@/ui/gallery/gallery-buttons'
import { GalleryTable } from '@/ui/gallery/gallery-table'
import { Pagination } from '@/ui/pagination'
import Search from '@/ui/search'
import { TableSkeleton } from '@/ui/skeletons/table-skeleton'
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
