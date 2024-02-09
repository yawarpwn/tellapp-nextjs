'use client'
import { DeleteIcon } from '@/icons'
import ConfirmModalAction from '@/ui/confirm-action-modal'
import { useState } from 'react'
import { useFormState } from 'react-dom'

const initialState = {
	message: null,
	errors: {},
}

function DeleteActionForm({ id, public_id, deleteAction }) {
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
				<input
					name='public_id'
					value={public_id}
					type='hidden'
					className='sr-only'
				/>
			</ConfirmModalAction>
			<button className='text-error' onClick={openModal}>
				<DeleteIcon />
			</button>
		</>
	)
}

export default DeleteActionForm
