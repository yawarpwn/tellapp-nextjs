'use client'

import { createProduct, updateProduct } from '@/lib/actions/products'
import { ModalButton } from '@/ui/modal-button'
import { InputsProduct } from './inputsProduct'

export function AddProductForm() {
	return (
		<ModalButton
			action={createProduct}
			renderInputs={(state) => <InputsProduct state={state} />}
		>
		</ModalButton>
	)
}

export function EditProductForm({ itemToEdit }) {
	return (
		<ModalButton
			action={updateProduct}
			itemToEdit={itemToEdit}
			renderInputs={(state, itemToEdit) => (
				<InputsProduct state={state} product={itemToEdit} />
			)}
		>
		</ModalButton>
	)
}
