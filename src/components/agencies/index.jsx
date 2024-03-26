'use client'
import { createAgency, updateAgency } from '@/lib/actions/agencies'
import { InputsAgency } from ../ui/agencies/inputs-agency'
import { ModalButton } from '../modal-button'

export function AddFormAgency() {
	return (
		<ModalButton
			action={createAgency}
			renderInputs={(state) => <InputsAgency state={state} />}
		/>
	)
}

export function EditFormAgency({ agency }) {
	return (
		<ModalButton
			action={updateAgency}
			itemToEdit={agency}
			renderInputs={(state, itemToEdit) => (
				<InputsAgency state={state} agency={itemToEdit} />
			)}
		/>
	)
}
