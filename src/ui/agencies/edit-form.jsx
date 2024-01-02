'use client'
import { updateAgency } from '@/lib/actions/agencies'
import { shootCoffeti } from '@/services/confetti'
import { useTransition } from 'react'
import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'

const initialState = {
	message: null,
	errors: {},
}
function EditForm({ agency }) {
	const [state, dispatch] = useFormState(updateAgency, initialState)
	const [isPending, startTransition] = useTransition()

	const handleSubmit = (e) => {
		const formData = new FormData(e.target)
		startTransition(async () => {
			try {
				await updateAgency(undefined, formData)
				shootCoffeti()
			} catch (error) {
				console.log('error al actualizar agencia')
			}
		})
	}

	return (
		<form onSubmit={handleSubmit}>
			<CreateEditInputs />
		</form>
	)
}

export default EditForm
