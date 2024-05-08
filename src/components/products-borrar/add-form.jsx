'use client'

import { createProduct } from '@/lib/actions/products'
import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'

const initialState = {
	message: null,
	errors: {},
}
function AddForm() {
	const [state, dispatch] = useFormState(createProduct, initialState)
	return (
		<>
			<form action={dispatch}>
				<CreateEditInputs state={state} />
			</form>
		</>
	)
}

export default AddForm
