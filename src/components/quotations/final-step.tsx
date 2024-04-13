import { useQuotationContext } from '@/hooks/use-quotation-store'
import { useToast } from '@/hooks/use-toast'
import { insertQuotation } from '@/lib/actions/quoatations'
import { shootCoffeti } from '@/lib/confetti'
import { useTransition } from 'react'
import React from 'react'
export function QuotationFinalStep() {
	const [pending, startTransition] = useTransition()
	const quo = useQuotationContext(state => state.quo)
	const items = useQuotationContext(state => state.items)
	const { toast } = useToast()

	// const toast = useToast()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (items.length === 0) {
			toast({
				title: 'Error',
				description: 'No se puede crear una cotización sin items',
				variant: 'destructive',
			})
			return
		}
		const quoToInsert = {
			...quo,
			items,
		}

		console.log(quoToInsert)
		return
		startTransition(async () => {
			try {
				await insertQuotation(quoToInsert)
				shootCoffeti()
			} catch (error) {
				toast({
					title: 'Error',
					description: 'No se pudo crear la cotización',
					variant: 'destructive',
				})
			}
		})
	}
	return (
		<form onSubmit={handleSubmit}>
			<button disabled={pending} type='submit' className='btn '>
				Crear Cotizacion
				<span className='btn btn-spinner'></span>
			</button>
		</form>
	)
}
