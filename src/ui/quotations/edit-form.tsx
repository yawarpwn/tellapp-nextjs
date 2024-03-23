'use client'
import useQuotations from '@/hooks/use-quotations'
import { useToast } from '@/hooks/use-toast'
import { shootCoffeti } from '@/lib/confetti'
import { QuotationUpdate } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import CreateEditInputs from './create-edit-inputs'
import ItemModal from './item-modal'

const initialState = {
	message: null,
	errors: {},
}

interface Props {
	quotationToUpdate: QuotationUpdate
	action: (
		_: undefined,
		formData: FormData,
	) => Promise<{ errors: any; message: string }>
}

function EditForm({ quotationToUpdate, action }: Props) {
	const { toast } = useToast()
	const [pending, startTransition] = useTransition()
	const [state, setState] = useState(initialState)
	const router = useRouter()

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

			toast({
				title: 'Creado',
				description: message,
				duration: 1000,
			})
			shootCoffeti()
			router.push(`/quotations/${quoNumber}`)
		})
	}

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
				onSubmit={handleSubmit}
			>
				<CreateEditInputs
					onChange={handleInputChange}
					quotation={quotation}
					state={state}
					pending={pending}
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
