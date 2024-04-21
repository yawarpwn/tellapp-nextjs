import { Card, CardContent } from '@/components/ui/card'
import { formatDateToLocal, getIgv } from '@/lib/utils'
import { QuotationItemType, type QuotationType } from '@/types'
import { add } from 'date-fns'
import React from 'react'

interface Props {
	company?: string
	ruc?: string
	address?: string
	items: QuotationItemType[]
	quoNumber: number
	created_at: string
	updated_at?: string
	deadline: number
}

export function ItemList(
	{
		company = '',
		ruc = '',
		address = '',
		items,
		quoNumber,
		created_at,
		updated_at,
		deadline,
	}: Props,
) {
	const { formatedSubTotal, formatedTotal, formatedIgv } = getIgv(items)
	return (
		<Card className='border-0'>
			<CardContent className='p-0'>
				<div className='flex justify-end'>
					<div className='text-right'>
						<h2 className='text-2xl md:text-3xl font-semibold'>
							Cotización
						</h2>
						<span className='mt-1 text-xl block text-yellow-500'>
							# {quoNumber}
						</span>
					</div>
				</div>
				<div className='mt-6 grid sm:grid-cols-2 gap-3'>
					<div>
						<h3 className='text-lg font-semibold '>
							Cliente:
						</h3>
						<h3 className='text-lg font-semibold '>
							{company}
						</h3>
						<address className='mt-2 not-italic text-muted-foreground '>
							{address}
						</address>
					</div>
					<div className='sm:text-right space-y-2'>
						<div className='grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2'>
							<dl className='grid sm:grid-cols-6 gap-x-3'>
								<dt className='col-span-3 font-semibold '>
									Fecha:
								</dt>
								<dd className='col-span-3 '>
									{formatDateToLocal(new Date(created_at))}
								</dd>
							</dl>
							<dl className='grid sm:grid-cols-6 gap-x-3'>
								<dt className='col-span-3 font-semibold '>
									Actualizado:
								</dt>
								<dd className='col-span-3 '>
									{updated_at && (
										formatDateToLocal(updated_at)
									)}
								</dd>
							</dl>
							<dl className='grid sm:grid-cols-6 gap-x-3'>
								<dt className='col-span-3 font-semibold '>
									Tiempo de entrega:
								</dt>
								<dd className='col-span-3 '>
									{deadline} día(s)
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
					<div className='mt-2 flex justify-start sm:justify-end'>
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
	)
}
