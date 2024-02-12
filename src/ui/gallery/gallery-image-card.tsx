'use client'
import { type GalleryImage } from '@/types'
import { GalleryDeleteForm } from '@/ui/gallery/galley-delete-form'
import { cn } from '@/utils'
import { EditIcon, MoreVertical, TrashIcon } from 'lucide-react'

import { useState } from 'react'

interface Props {
	image: GalleryImage
}
export function GalleryImageCard({ image }: Props) {
	const { thumb, publicId } = image
	const [active, setActive] = useState(false)

	return (
		<div
			className='overflow-hidden rounded-md'
			onMouseOver={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
		>
			<div className='block w-[100px] h-[100px] relative'>
				<div
					className={cn(
						'flex justify-evenly absolute bottom-0 left-0 bg-base-200/50 backdrop-blur w-full h-8 translate-y-12 transition',
						{ 'translate-y-0': active },
					)}
				>
					<button>
						<EditIcon />
					</button>
					<GalleryDeleteForm publicId={publicId} />
				</div>
				<img src={thumb} className='w-full h-full object-contain' />
			</div>
		</div>
	)
}
