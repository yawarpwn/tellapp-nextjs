import { ActionForm } from '@/components/ui/action-button'
import { DocumentDuplicateIcon } from '@/icons'
import { deleteQuotation, duplicateQuotation } from '@/lib/actions/quoatations'
import { TrashIcon } from 'lucide-react'

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
