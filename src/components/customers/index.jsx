'use client'
import { ModalButton } from '@/components/modal-button'
import { createCustomer, updateCustomer } from '@/lib/actions/customers'
import { CustomerInputs } from './customerInputs'

export function AddCustomerForm() {
	return (
		<ModalButton
			action={createCustomer}
			renderInputs={(state) => <CustomerInputs state={state} />}
		>
		</ModalButton>
	)
}

export function EditCustomerForm({ customer }) {
	return (
		<ModalButton
			action={updateCustomer}
			itemToEdit={customer}
			renderInputs={(state, itemToEdit) => (
				<CustomerInputs state={state} customer={itemToEdit} />
			)}
		/>
	)
}
