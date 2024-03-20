'use client'
import { DeleteIcon } from '@/icons'
import { deleteQuotation } from '@/lib/actions/quoatations'
import ConfirmModalAction from '@/ui/confirm-action-modal'
import { useState } from 'react'
import { useFormState } from 'react-dom'

const initialState = {
	message: null,
	errors: {},
}

interface Props {
	number: number
}

export function QuotationDeleteForm(
	props: Props,
) {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)
	const [state, dispatch] = useFormState(deleteQuotation, initialState)
	return (
		<>
			<ConfirmModalAction
				title={`Vas a duplicar la cotizacion ${props.number}`}
				onAction={dispatch}
				isOpen={isOpenModal}
				onClose={closeModal}
			>
				<input
					name='number'
					value={props.number}
					type='hidden'
					className='sr-only'
				/>
			</ConfirmModalAction>
			<button className='btn btn-secondary' onClick={openModal}>
				<DeleteIcon size={20} />
				<span className='hidden md:block'>Eliminar</span>
			</button>
		</>
	)
}
