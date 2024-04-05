'use client'
import { ActionForm } from '@/components/action-button'
import { QuotationItemModal } from '@/components/quotation-item-modal'
import { DocumentDuplicateIcon } from '@/icons'
import { EditIcon, TrashIcon } from '@/icons'
import { deleteQuotation, duplicateQuotation } from '@/lib/actions/quoatations'
import { QuotationItemType } from '@/types'
import React from 'react'

export function QuotationDuplicateButton({ number }: { number: number }) {
	return (
		<ActionForm
			action={duplicateQuotation}
			dialogTitle='Duplicar'
			dialogDescription={` ¿Seguro de duplicar Cotización #${number}?`}
			buttonComponent={
				<button className='btn btn-secondary'>
					<DocumentDuplicateIcon size={20} />
					<span className='hidden md:block'>Duplicar</span>
				</button>
			}
		>
			<input
				name='number'
				value={number}
				type='hidden'
				className='sr-only'
			/>
		</ActionForm>
	)
}

export function QuotationDeleteButton({ number }: { number: number }) {
	return (
		<ActionForm
			action={deleteQuotation}
			dialogTitle='Eliminar'
			dialogDescription={`¿Seguro de eliminar Cotización #${number}?`}
			buttonComponent={
				<button className='btn btn-secondary'>
					<TrashIcon size={20} />
					<span className='hidden md:block'>Eliminar</span>
				</button>
			}
		>
			<input
				name='number'
				value={number}
				type='hidden'
				className='sr-only'
			/>
		</ActionForm>
	)
}

export function QuotationAddItemButton() {
	const [open, setOpen] = React.useState(false)
	return (
		<>
			<button onClick={() => setOpen(true)} className='btn btn-secondary'>
				Agregar Producto
			</button>
			{open && (
				<QuotationItemModal
					onOpenChange={setOpen}
					closeModal={() => setOpen(false)}
					open={open}
				/>
			)}
		</>
	)
}

export function QuotationEditItemButton(
	{ itemToEdit }: { itemToEdit: QuotationItemType },
) {
	const [open, setOpen] = React.useState(false)
	return (
		<>
			<button onClick={() => setOpen(true)} className='btn btn-sm'>
				<EditIcon size={20} />
			</button>
			{open && (
				<QuotationItemModal
					itemToEdit={itemToEdit}
					onOpenChange={setOpen}
					closeModal={() => setOpen(false)}
					open={open}
				/>
			)}
		</>
	)
}
