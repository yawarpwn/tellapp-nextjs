'use client'
import { deleteImageGallery } from '@/lib/actions/gallery'
import {
	Loader2,
	Trash2Icon,
} from 'lucide-react'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
	const { pending } = useFormStatus()
	return (
		<button className='btn btn-error btn-xs btn-circle text-white'>
			{pending
				? <Loader2 className='animate-spin' />
				: <Trash2Icon className='w-4 h-4' />}
		</button>
	)
}

export function GalleryDeleteForm({ publicId }: { publicId: string }) {
	return (
		<form action={deleteImageGallery}>
			<input type='hidden' name='publicId' value={publicId} />
			<SubmitButton />
		</form>
	)
}
