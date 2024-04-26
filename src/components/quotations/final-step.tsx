import { Button } from '@/components/ui/button'
import {
	useQuotationContext,
	useQuotationStore,
} from '@/hooks/use-quotation-store'
import { useToast } from '@/hooks/use-toast'
import { insertQuotation, setQuotation } from '@/lib/actions/quoatations'
import { shootCoffeti } from '@/lib/confetti'
import { QuotationCreateType, QuotationUpdateType } from '@/types'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import React from 'react'
import { ItemsList } from './items-list'
export function QuotationFinalStep() {
	const [pending, startTransition] = useTransition()
	const store = useQuotationStore()
	const quo = useQuotationContext(state => state.quo)
	const isUpdate = useQuotationContext(state => state.isUpdate)
	const quoNumber = useQuotationContext(state => state.quoNumber)
	const decrementStep = useQuotationContext(state => state.decrementStep)
	const items = useQuotationContext(state => state.items)
	const { toast } = useToast()

	const router = useRouter()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		startTransition(async () => {
			if ('id' in quo) {
				// update quotation
				const quoToUpdate = {
					...quo,
					id: quo.id,
					items,
				}
				const [error, data] = await setQuotation(
					quoToUpdate as QuotationUpdateType,
				)

				if (error) {
					toast({
						title: 'Error',
						description: 'No se pudo actualizar la cotización',
						variant: 'destructive',
					})
				}

				if (data) {
					store?.persist.clearStorage()
					router.push(`/new-quos/${data.number}`)
				}
			} else {
				// crate quotation
				const quoToInsert = {
					...quo,
					items,
				}
				const [error, data] = await insertQuotation(
					quoToInsert as QuotationCreateType,
					items,
				)

				// handle error
				if (error) {
					toast({
						title: 'Error',
						description: 'No se pudo crear la cotización',
						variant: 'destructive',
					})
				}

				if (data) {
					// success
					store?.persist.clearStorage()
					shootCoffeti()
					router.push(`/new-quos/${data.number}`)
				}
			}
		})
	}

	return (
		<div>
			<ItemsList
				ruc={quo.ruc}
				company={quo.company}
				deadline={quo?.deadline || 1}
				address={quo.address}
				items={items}
				quoNumber={quoNumber}
				created_at={new Date().toISOString()}
				updated_at={quo?.updated_at}
			/>
			<form
				onSubmit={handleSubmit}
				className='flex items-center justify-between mt-4'
			>
				<Button disabled={pending} type='button' onClick={decrementStep}>
					Anterior
				</Button>
				<Button variant='primary' disabled={pending} type='submit'>
					{pending && <Loader2 className='mr-2 w-4 h-4 animate-spin' />}
					{isUpdate ? 'Actualizar' : 'Crear'}
				</Button>
			</form>
		</div>
	)
}
