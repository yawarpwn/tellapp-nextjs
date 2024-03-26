import { CreateUpdateImageModal } from '@/components/ui/create-update-image-modal'
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
					<button onClick={openModal}>
						<EditIcon />
					</button>
				)
				: (
					<button onClick={openModal} className='btn btn-primary btn-sm'>
						<span>
							Agregar
						</span>
						<PlusIcon />
					</button>
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
