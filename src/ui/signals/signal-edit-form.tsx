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

	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)

	return (
		<>
			<button onClick={openModal}>
				<EditIcon />
			</button>
			{isOpenModal && (
				<SignalFormModal
					signal={signal}
					onCloseModal={closeModal}
					isOpenModal={isOpenModal}
				/>
			)}
		</>
	)
}
