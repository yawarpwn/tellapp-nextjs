'use client'
import useAutoSave from '@/hooks/use-autosave'
import useQuotations from '@/hooks/use-quotations'
import { useToast } from '@/hooks/use-toast'
import { shootCoffeti } from '@/lib/confetti'
import { createClient } from '@/lib/supabase/client'
import ItemPickerModal from '@/components/ui/item-picker-modal'
import compare from 'just-compare'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTransition } from 'react'
import CreateEditInputs from './create-edit-inputs'
import ItemModal from './item-modal'
import SavedQuotationModal from './saved-quotation-modal'

const initialState = {
	message: null,
	errors: {},
}

interface Props {
	action: (_: undefined, formData: FormData) => Promise<{ errors: any }>
	lastQuotationNumber: number
}
function AddForm({ action, lastQuotationNumber }: Props) {
	const initialQuotationState = {
		number: lastQuotationNumber + 1,
		company: '',
		ruc: '',
		address: '',
		deadline: '',
		items: [],
		is_regular_customer: false,
		include_igv: true,
	}

	const [state, setState] = useState(initialState)
	const [savedQuotation, setSavedQuotation] = useState(null)
	const [isCustomersModalOpen, setIsCustomersModalOpen] = useState(false)
	const [customers, setCustomer] = useState([])
	const router = useRouter()
	const { toast } = useToast()
	const [pending, startTransition] = useTransition()

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

	const handlePick = (
		customer: { name: string; ruc: string; address: string },
	) => {
		updateQuotation({
			...quotation,
			company: customer.name,
			ruc: customer.ruc,
			address: customer.address,
			is_regular_customer: true,
		})
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		startTransition(async () => {
			const formData = new FormData(event.currentTarget)
			const { errors, message } = await action(undefined, formData)

			const quoNumber = formData.get('number') as string

			if (errors) {
				const JSonError = JSON.stringify(errors, null, 2)
				toast({
					title: 'Error',
					description: <pre>{JSonError}</pre>,
					variant: 'destructive',
				})

				setState({ ...state, errors })

				return
			}

			shootCoffeti()
			router.push(`/quotations/${quoNumber}`)
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
				<button onClick={openCustomersModal} className='btn btn-secondary'>
					Cliente frecuentes
				</button>
			</div>
			<form
				onSubmit={handleSubmit}
				// action={dispatch}
			>
				<CreateEditInputs
					state={state}
					onChange={handleInputChange}
					quotation={quotation}
					onDeleteItem={deleteItem}
					onAddItem={addItem}
					updateQuotation={updateQuotation}
					openEditItemModal={openEditItemModal}
					openItemModal={openItemModal}
					deleteItem={deleteItem}
					pending={pending}
				/>
			</form>
		</>
	)
}

export default AddForm
