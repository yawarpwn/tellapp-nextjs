'use client'

import { updateProduct } from '@/lib/actions/products'
import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'

const initialState = {
	message: null,
	errors: {},
}
function EditForm({ product }) {
	const [state, dispatch] = useFormState(updateProduct, initialState)
	return (
		<form action={dispatch}>
			<CreateEditInputs product={product} state={state} />
		</form>
	)
}

export default EditForm
