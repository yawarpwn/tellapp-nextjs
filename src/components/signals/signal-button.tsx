'use client'

import { CreateUpdateImageButton } from '@/components/ui/modal-image-form'
import { SIGNALS_CATEGORIES } from '@/constants'
import { createSignal, deleteSignal, updateSignal } from '@/lib/actions/signals'
import { type Signal } from '@/types'
import DeleteActionForm from '../delete-action-form'

interface Props {
	item: Signal
}

export function SignalEditFormButton({ item }: Props) {
	return (
		<>
			<CreateUpdateImageButton
				item={item}
				action={updateSignal}
				categories={Object.values(SIGNALS_CATEGORIES)}
			/>
		</>
	)
}

export function SignalAddFormButton() {
	return (
		<>
			<CreateUpdateImageButton
				action={createSignal}
				categories={Object.values(SIGNALS_CATEGORIES)}
			/>
		</>
	)
}

export function SignalDeleteFormButton(
	{ id, publicId }: { id: string; publicId: string },
) {
	return (
		<DeleteActionForm
			id={id}
			publicId={publicId}
			deleteAction={deleteSignal}
		/>
	)
}
