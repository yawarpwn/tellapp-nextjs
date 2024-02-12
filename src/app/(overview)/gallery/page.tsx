import { fetchGalleryImages } from '@/lib/cloudinary'
import { GalleryAddButton } from '@/ui/gallery/gallery-add-button'
import { GalleryImagesList } from '@/ui/gallery/gallery-images-list'

export default async function Page() {
	const galleryImages = await fetchGalleryImages()

	return (
		<div>
			<header className='flex justify-between gap-2'>
				<div className='border border-dashed border-primary w-full pl-2 rounded-sm'>
					<h2 className='font-bold text-2xl text-primary '>Nuestra Galeria</h2>
				</div>
				<GalleryAddButton />
			</header>

			<GalleryImagesList title={'Galeria'} images={galleryImages} />
			{/* {Object.entries(categories).map(([title, images]) => { */}
			{/* 	return <GalleryImagesList key={title} title={title} images={images} /> */}
			{/* })} */}
		</div>
	)
}
