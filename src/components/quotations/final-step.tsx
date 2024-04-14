import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { useToast } from '@/hooks/use-toast'
import { insertQuotation } from '@/lib/actions/quoatations'
import { shootCoffeti } from '@/lib/confetti'
import { formatDateToLocal } from '@/lib/utils'
import { formatNumberToLocal } from '@/lib/utils'
import { getIgv } from '@/lib/utils'
import { useTransition } from 'react'
import React from 'react'
export function QuotationFinalStep() {
	const [pending, startTransition] = useTransition()
	const quo = useQuotationContext(state => state.quo)
	const setQuo = useQuotationContext(state => state.setQuo)
	const decrementStep = useQuotationContext(state => state.decrementStep)
	const items = useQuotationContext(state => state.items)
	const { toast } = useToast()

	// const toast = useToast()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

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

	const { formatedSubTotal, formatedTotal, formatedIgv } = getIgv(items)
	return (
		<div>
			<Card className='border-0'>
				<CardContent className='p-0'>
					<div className='flex justify-end'>
						<div className='text-right'>
							<h2 className='text-2xl md:text-3xl font-semibold'>
								Cotización #
							</h2>
							<span className='mt-1 text-xl block '>
								5050
							</span>
						</div>
					</div>
					<div className='mt-6 grid sm:grid-cols-2 gap-3'>
						<div>
							<h3 className='text-lg font-semibold '>
								Cliente:
							</h3>
							<h3 className='text-lg font-semibold '>
								{quo.company ?? ''}
							</h3>
							<address className='mt-2 not-italic text-muted-foreground '>
								{quo.address ?? ''}
							</address>
						</div>
						<div className='sm:text-right space-y-2'>
							<div className='grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2'>
								<dl className='grid sm:grid-cols-6 gap-x-3'>
									<dt className='col-span-3 font-semibold '>
										Fecha:
									</dt>
									<dd className='col-span-3 '>
										{formatDateToLocal(new Date())}
									</dd>
								</dl>
								<dl className='grid sm:grid-cols-6 gap-x-3'>
									<dt className='col-span-3 font-semibold '>
										Actualizado:
									</dt>
									<dd className='col-span-3 '>
										{formatDateToLocal(new Date())}
									</dd>
								</dl>
							</div>
						</div>
					</div>

					{/* Table */}
					<div className='mt-3'>
						<div className='border border-input p-2 rounded-lg space-y-1'>
							<div className='hidden sm:grid sm:grid-cols-12'>
								<div className='sm:col-span-8 text-xs font-medium  uppercase'>
									Descripcion
								</div>
								<div className='text-xs font-medium  uppercase'>
									U/M
								</div>
								<div className='text-left text-xs font-medium  uppercase'>
									Cant
								</div>
								<div className='text-left text-xs font-medium  uppercase'>
									P. Unt.
								</div>
								<div className='text-right text-xs font-medium  uppercase'>
									Monto
								</div>
							</div>
							<div className='hidden sm:block border-b border-input'></div>
							<div className='grid grid-cols-4 sm:grid-cols-12 gap-y-1 [&>div]:border-b [&>div]:border-border '>
								{items.map((item, index) => (
									<React.Fragment key={index}>
										<div className='col-span-full sm:col-span-8 py-2'>
											<p className='text-xs sm:text-sm '>
												{item.description}
											</p>
										</div>
										<div className=' py-2'>
											<p className=''>
												{item.unit_size}
											</p>
										</div>
										<div className=' py-2'>
											<p className=''>
												{item.qty}
											</p>
										</div>
										<div className=' py-2'>
											<p className=''>
												S/ {item.price}
											</p>
										</div>
										<div className='py-2'>
											<p className='sm:text-right '>
												S/ {item.qty * item.price}
											</p>
										</div>
									</React.Fragment>
								))}
							</div>
							{/* <div className='sm:hidden border-b border-input'></div> */}
						</div>

						{/* Totals */}
						<div className='mt-2 flex justify-center sm:justify-end'>
							<div className='sm:text-right space-y-2'>
								<div className='grid grid-cols-3 sm:grid-cols-1 gap-3 sm:gap-2'>
									<dl className='grid sm:grid-cols-5 gap-x-3'>
										<dt className='col-span-3 font-semibold '>
											Subtotal:
										</dt>
										<dd className='col-span-2 '>
											{formatedSubTotal}
										</dd>
									</dl>
									<dl className='grid sm:grid-cols-5 gap-x-3'>
										<dt className='col-span-3 font-semibold '>
											Igv:
										</dt>
										<dd className='col-span-2 '>
											{formatedIgv}
										</dd>
									</dl>
									<dl className='grid sm:grid-cols-5 gap-x-3'>
										<dt className='col-span-3 font-semibold '>
											Total:
										</dt>
										<dd className='col-span-2 '>
											{formatedTotal}
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
			<form
				onSubmit={handleSubmit}
				className='flex items-center justify-between mt-4'
			>
				<Button disabled={pending} type='button' onClick={decrementStep}>
					Anterior
				</Button>
				<Button disabled={pending} type='submit'>Crear Cotizacion</Button>
			</form>
		</div>
	)
}
