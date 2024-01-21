'use client'

import useAutoSave from '@/hooks/use-autosave'
import useQuotations from '@/hooks/use-quotations'
import { createClient } from '@/lib/supabase/client'
import ItemPickerModal from '@/ui/components/item-picker-modal'
import compare from 'just-compare'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'
import ItemModal from './item-modal'
import SavedQuotationModal from './saved-quotation-modal'

const initialState = {
	message: null,
	errors: {},
}

function AddForm({ action, serverCustomers, lastQuotationNumber }) {
	const initialQuotationState = {
		number: lastQuotationNumber + 1,
		company: '',
		ruc: '',
		address: '',
		deadline: '',
		items: [],
	}

	const [state, dispatch] = useFormState(action, initialState)
	const [savedQuotation, setSavedQuotation] = useState(null)
	const [isCustomersModalOpen, setIsCustomersModalOpen] = useState(false)
	const [customers, setCustomer] = useState([])

	const closeSavedQuotationModal = () => {
		setSavedQuotation(null)
	}

	const openCustomersModal = () => setIsCustomersModalOpen(true)
	const closeCustomersModal = () => setIsCustomersModalOpen(false)
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
	} = useQuotations({ initialData: initialQuotationState })

	useEffect(() => {
		const quotationFromLocalStorage = JSON.parse(
			localStorage.getItem('__QUOTATION__'),
		)

		if (quotationFromLocalStorage) {
			setSavedQuotation(quotationFromLocalStorage)
		}
	}, [])

	useEffect(() => {
		const getCustomers = async () => {
			const supabase = createClient()
			const { data: customers } = await supabase.from('customers').select()
			setCustomer(customers)
		}

		getCustomers()
	}, [])

	const saveInLocalStoreage = () => {
		const isEmpety = compare(quotation, initialQuotationState)
		if (!isEmpety) {
			localStorage.setItem('__QUOTATION__', JSON.stringify(quotation))
		}
	}

	useAutoSave({ callback: saveInLocalStoreage, delay: 3000 })

	const onCancel = () => {
		updateQuotation(initialQuotationState)
		localStorage.removeItem('__QUOTATION__')
		closeSavedQuotationModal()
	}

	const handlePick = customer => {
		updateQuotation({
			...quotation,
			company: customer.name,
			ruc: customer.ruc,
			address: customer.address,
		})
	}

	return (
		<>
			<SavedQuotationModal
				isOpen={savedQuotation}
				onClose={onCancel}
				onConfirm={() => {
					updateQuotation({
						...quotation,
						...savedQuotation,
					})
					closeSavedQuotationModal()
				}}
			/>
			<ItemModal
				isOpenModal={isItemModalOpen}
				onCloseModal={closeEditItemModal}
				editingItem={editingItem}
				addItem={addItem}
				updateItem={updateItem}
			/>
			<ItemPickerModal
				isOpen={isCustomersModalOpen}
				onClose={closeCustomersModal}
				onPick={handlePick}
				items={customers}
				renderLabel={item => <p className='text-sm'>{item.name}</p>}
				filterProperty='name'
			/>
			<div className='flex justify-between'>
				<div />
				<button onClick={openCustomersModal} className='btn'>
					Cliente frecuentes
				</button>
			</div>
			<form
				action={dispatch}
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

export default AddForm
