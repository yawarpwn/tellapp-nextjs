import { createClient } from '@/lib/supabase/server'
import { GalleryAddButton } from '@/ui/gallery/gallery-add-button'
import { GalleryImagesList } from '@/ui/gallery/gallery-images-list'
import { cookies } from 'next/headers'

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: resources } = await supabase.from('gallery').select('*')

	const categories = Object.groupBy(resources, ({ category }) => category)

	return (
		<div>
			<header className='flex justify-between'>
				<h2 className='font-bold text-2xl '>Nuestra Galeria</h2>
				<GalleryAddButton />
			</header>
			{Object.entries(categories).map(([title, images]) => {
				return <GalleryImagesList key={title} title={title} images={images} />
			})}
		</div>
	)
}
