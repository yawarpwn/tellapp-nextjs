import { fetchGalleryPages } from '@/lib/data/gallery'
import { GalleryAddButton } from '@/ui/gallery/gallery-add-button'
import { GalleryTable } from '@/ui/gallery/gallery-table'
import { Pagination } from '@/ui/pagination'
import { Suspense } from 'react'

export default async function Page(
	{ searchParams }: { searchParams?: { page?: string; query?: string } },
) {
	const page = Number(searchParams.page) || 1
	const query = searchParams.query || ''
	const totalPages = await fetchGalleryPages(query)

	console.log(totalPages)

	return (
		<div>
			<header className='flex justify-between gap-2'>
				<div className='border border-dashed border-primary w-full pl-2 rounded-sm'>
					<h2 className='font-bold text-2xl text-primary '>Nuestra Galeria</h2>
				</div>
				<GalleryAddButton />
			</header>
			<Suspense fallback={<div>Cargando...</div>}>
				<GalleryTable currentPage={page} query={query} />
			</Suspense>
			{/* <GalleryImagesList title={'Galeria'} images={galleryImages} /> */}
			<Pagination totalPages={totalPages} />
		</div>
	)
}
