'use client'
import { ConfirmActionModal } from '@/components/confirm-action-modal'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'

// const initialState = {
// 	message: null,
// 	errors: {},
// }

interface Props {
	action: (_: undefined, formData: FormData) => Promise<void>
	buttonComponent: React.JSX.Element
	children: React.ReactNode
	modalTitle?: string
}

export function ActionForm(props: Props) {
	const { action, buttonComponent, children, modalTitle } = props
	const [isOpenModal, setIsOpenModal] = useState(false)
	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)
	const [state, dispatch] = useFormState(action, null)
	return (
		<>
			<ConfirmActionModal
				onAction={dispatch}
				isOpen={isOpenModal}
				onClose={closeModal}
				title={modalTitle}
			>
				{children}
			</ConfirmActionModal>
			{React.cloneElement(buttonComponent, { onClick: openModal })}
		</>
	)
}
