'use client'
import type { Signal } from '@/types'

import { createClient } from '@/lib/supabase/client'
import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { SignalFormModal } from './signal-form-modal'

interface Props {
	signal: Signal
}
export function SignalEditForm({ signal }: Props) {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [signalToEdit, setSignalToEdit] = useState(signal)

	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)

	const handleEditSignal = async () => {
		openModal()
	}

	const handleCloseModal = () => {
		closeModal()
	}

	return (
		<>
			<button onClick={openModal}>
				<EditIcon />
			</button>
			<SignalFormModal
				signal={signalToEdit}
				onCloseModal={closeModal}
				isOpenModal={isOpenModal}
			/>
		</>
	)
}
