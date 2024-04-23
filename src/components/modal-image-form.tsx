import { CreateUpdateImageModal } from '@/components/create-update-image-modal'
import { Button } from '@/components/ui/button'
import type { GalleryImage, Signal } from '@/types'
import { EditIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
	item?: Signal | GalleryImage
	action: (formData: FormData) => Promise<void>
	categories: string[]
	type?: 'gallery' | 'signal'
}

export function CreateUpdateImageButton(
	{ item, action, categories, type }: Props,
) {
	const [isOpenModal, setIsOpenModal] = useState(false)

	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)

	const isEditMode = item != null

	return (
		<>
			{isEditMode
				? (
					<Button onClick={openModal}>
						<EditIcon />
					</Button>
				)
				: (
					<Button onClick={openModal} variant={'primary'}>
						<span>
							Agregar
						</span>
						<PlusIcon />
					</Button>
				)}
			{isOpenModal && (
				<CreateUpdateImageModal
					modalTitle={isEditMode ? 'Editar imagen' : 'Agregar imagen'}
					type={type}
					item={item}
					isEditMode={isEditMode}
					action={action}
					categories={categories}
					onCloseModal={closeModal}
					isOpenModal={isOpenModal}
				/>
			)}
		</>
	)
}
