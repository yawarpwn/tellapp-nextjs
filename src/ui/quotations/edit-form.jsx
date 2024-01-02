'use client'

import useQuotations from '@/hooks/use-quotations'
import { shootCoffeti } from '@/services/confetti'
import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'
import ItemModal from './item-modal'

const initialState = {
	message: null,
	errors: {},
}

function EditForm({ quotationToUpdate, action }) {
	const [state, dispatch] = useFormState(action, initialState)

	// TODO: Mejorar
	const {
		addItem,
		deleteItem,
		updateItem,
		updateQuotation,
		handleInputChange,
		openEditItemModal,
		openItemModal,
		closeEditItemModal,
		quotation,
		isItemModalOpen,
		editingItem,
	} = useQuotations({ initialData: quotationToUpdate })

	return (
		<>
			<ItemModal
				isOpenModal={isItemModalOpen}
				onCloseModal={closeEditItemModal}
				editingItem={editingItem}
				addItem={addItem}
				updateItem={updateItem}
			/>
			<form
				action={async formData => {
					await dispatch(formData)
					shootCoffeti()
				}}
			>
				<CreateEditInputs
					onChange={handleInputChange}
					quotation={quotation}
					state={state}
					onDeleteItem={deleteItem}
					onAddItem={addItem}
					updateQuotation={updateQuotation}
					openEditItemModal={openEditItemModal}
					openItemModal={openItemModal}
					deleteItem={deleteItem}
				/>
			</form>
		</>
	)
}

export default EditForm
