'use client'
import DeleteActionForm from '@/components/delete-action-form'
import { CreateUpdateImageButton } from '@/components/ui/modal-image-form'
import { GALLERY_CATEGORIES } from '@/constants'
import {
	createGalleryImage,
	deleteGalleryImage,
	updateGalleryImage,
} from '@/lib/actions/gallery'
import type { GalleryImage } from '@/types'

export function GalleryAddFormButton() {
	return (
		<>
			<CreateUpdateImageButton
				type='gallery'
				action={createGalleryImage}
				categories={Object.values(GALLERY_CATEGORIES)}
			/>
		</>
	)
}

export function GalleryEditFormButton({
	galleryImage,
}: { galleryImage: GalleryImage }) {
	return (
		<>
			<CreateUpdateImageButton
				item={galleryImage}
				action={updateGalleryImage}
				type='gallery'
				categories={Object.values(GALLERY_CATEGORIES)}
			/>
		</>
	)
}

export function GalleryDeleteFormButton({ id, publicId }: {
	id: string
	publicId: string
}) {
	return (
		<DeleteActionForm
			id={id}
			publicId={publicId}
			deleteAction={deleteGalleryImage}
		/>
	)
}
