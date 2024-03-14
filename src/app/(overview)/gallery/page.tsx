import { fetchGalleryPages } from '@/lib/data/gallery'
import { GalleryAddFormButton } from '@/ui/gallery/gallery-buttons'
import { GalleryTable } from '@/ui/gallery/gallery-table'
import { Pagination } from '@/ui/pagination'
import Search from '@/ui/search'
import { Suspense } from 'react'

export default async function Page(
	{ searchParams }: { searchParams?: { page?: string; query?: string } },
) {
	const page = Number(searchParams?.page) || 1
	const query = searchParams?.query || ''
	const totalPages = await fetchGalleryPages(query)

	return (
		<div>
			<header className='flex items-center justify-between gap-2'>
				<Search placeholder='Buscar foto...' />
				<GalleryAddFormButton />
			</header>
			<Suspense fallback={<div>Cargando...</div>}>
				<GalleryTable currentPage={page} query={query} />
			</Suspense>
			{/* <GalleryImagesList title={'Galeria'} images={galleryImages} /> */}
			<Pagination totalPages={totalPages} />
		</div>
	)
}
