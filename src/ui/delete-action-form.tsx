'use client'
import { DeleteIcon } from '@/icons'
import ConfirmModalAction from '@/ui/confirm-action-modal'
import { useState } from 'react'
import { useFormState } from 'react-dom'

const initialState = {
	message: null,
	errors: {},
}

interface Props {
	id: string
	publicId?: string
	deleteAction: (_: undefined, formData: FormData) => Promise<void>
}

function DeleteActionForm({ id, publicId, deleteAction }: Props) {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)
	const [state, dispatch] = useFormState(deleteAction, initialState)
	return (
		<>
			<ConfirmModalAction
				onAction={dispatch}
				isOpen={isOpenModal}
				onClose={closeModal}
			>
				<input name='id' value={id} type='hidden' className='sr-only' />
				{publicId && (
					<input
						name='publicId'
						value={publicId}
						type='hidden'
						className='sr-only'
					/>
				)}
			</ConfirmModalAction>
			<button className='text-error' onClick={openModal}>
				<DeleteIcon />
			</button>
		</>
	)
}

export default DeleteActionForm
