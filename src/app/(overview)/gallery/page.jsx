import { createClient } from '@/lib/supabase/server'
import { GalleryAddButton } from '@/ui/gallery/gallery-add-button'
import { GalleryImagesList } from '@/ui/gallery/gallery-images-list'
import { Test } from '@/ui/test'
import groupBy from 'just-group-by'
import { cookies } from 'next/headers'

export default async function Page() {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const { data: resources } = await supabase.from('gallery').select('*')

	const categories = groupBy(resources, ({ category }) => category)

	return (
		<div>
			<header className='flex justify-between gap-2'>
				<div className='border border-dashed border-primary w-full pl-2 rounded-sm'>
					<h2 className='font-bold text-2xl text-primary '>Nuestra Galeria</h2>
				</div>
				<GalleryAddButton />
			</header>
			{Object.entries(categories).map(([title, images]) => {
				return <GalleryImagesList key={title} title={title} images={images} />
			})}
		</div>
	)
}
