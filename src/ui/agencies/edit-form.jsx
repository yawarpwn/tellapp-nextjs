'use client'
import { updateAgency } from '@/lib/actions/agencies'
import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'

const initialState = {
	message: null,
	errors: {},
}
function EditForm({ agency }) {
	const [state, dispatch] = useFormState(updateAgency, initialState)
	console.log({ state })
	return (
		<form action={dispatch}>
			<CreateEditInputs agency={agency} state={state} />
		</form>
	)
}

export default EditForm
