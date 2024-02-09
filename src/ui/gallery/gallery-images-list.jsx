import { GalleryImageCard } from './gallery-image-card'

const kebabToNormal = (str) => str.replace(/-/g, ' ')
const capitzalizeFirstLetter = (str) =>
	str.charAt(0).toUpperCase() + str.slice(1)

export function GalleryImagesList({ images, title }) {
	const formatedTitle = title = capitzalizeFirstLetter(kebabToNormal(title))
	return (
		<div>
			<h2 className='text-xl font-semibold'>{formatedTitle}</h2>
			<ul className='grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-1 mt-2'>
				{images.map((image) => (
					<GalleryImageCard
						key={image.id}
						image={image}
					/>
				))}
			</ul>
		</div>
	)
}
