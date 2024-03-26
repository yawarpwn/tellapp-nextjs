'use client'

import { ModalButton } from '@/components/modal-button'
import { createProduct, updateProduct } from '@/lib/actions/products'
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
