'use client'
import { DocumentDuplicateIcon } from '@/icons'
import { duplicateQuotation } from '@/lib/actions/quoatations'
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

export function DuplicateQuotation(
	props: Props,
) {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)
	const [state, dispatch] = useFormState(duplicateQuotation, initialState)
	return (
		<>
			<ConfirmModalAction
				title={`Duplicar la cotizacion ${props.number}`}
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
				<DocumentDuplicateIcon size={20} />
				<span className='hidden md:block'>Duplicar</span>
			</button>
		</>
	)
}
