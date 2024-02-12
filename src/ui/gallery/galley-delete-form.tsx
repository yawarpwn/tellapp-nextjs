import { deleteImageGallery } from '@/lib/actions/gallery'
import { EditIcon, TrashIcon } from 'lucide-react'

export function GalleryDeleteForm({ publicId }: { publicId: string }) {
	return (
		<form action={deleteImageGallery}>
			<input type='hidden' name='publicId' value={publicId} />
			<button>
				<TrashIcon className='w-4 h-4' />
			</button>
		</form>
	)
}
