import { EyeIcon } from '@/icons'
import { fetchFilteredQuotations } from '@/lib/quotations-data'
import { getIgv } from '@/utils'
import { formatDateToLocal } from '@/utils'
import Link from 'next/link'
import React from 'react'
import { EditButton } from '../buttons'

async function QuotationsTable({ query, currentPage }) {
	const quotations = await fetchFilteredQuotations({ query, currentPage })
	return (
		<>
			<div className='md:hidden mt-4'>
				{quotations?.map((quotation) => (
					<div
						key={quotation.id}
						className='mb-2 w-full rounded-md bg-base-200 p-4'
					>
						<div className='flex flex-col items-center justify-between border-b border-base-content/10 pb-4 w-full'>
							<div className='mb-2 flex items-center justify-between w-full'>
								<p>
									<span className='text-primary '>#</span>
									<span>
										{quotation.number}
									</span>
								</p>
								<div>
									{quotation.ruc}
								</div>
							</div>
							<p className='text-xs text-base-content/70'>
								{quotation.company}
							</p>
						</div>
						<div className='flex w-full items-center justify-between pt-4'>
							<div>
								<p className='text-xl font-medium'>
									S/ {getIgv(quotation.items).total}
								</p>
								<p>{formatDateToLocal(quotation.created_at)}</p>
							</div>
							<div className='flex justify-end gap-2'>
								<EditButton
									href={`/quotations/${quotation.number}/update`}
								/>
								<Link href={`/quotations/${quotation.number}`}>
									<EyeIcon />
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className='overflow-x-auto'>
				<table className='table hidden xl:block'>
					{/* head */}
					<thead>
						<tr>
							<th>No</th>
							<th>Cliente</th>
							<th>Fecha</th>
							<th>Total</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{quotations?.map(quotation => {
							const { total } = getIgv(quotation.items)
							const formatedDate = new Intl.DateTimeFormat('es').format(
								new Date(quotation.created_at),
							)
							return (
								<tr key={quotation.id}>
									<td>
										<Link href={`/quotations/${quotation.number}`}>
											<span className='text-primary font-bold'>#</span>
											{quotation.number}
										</Link>
									</td>
									<td>
										<div>
											<p className='w-[300px]'>{quotation.company}</p>
											<p>{quotation.ruc}</p>
										</div>
									</td>
									<td>
										<span className='text-xs'>{formatedDate}</span>
									</td>
									<td>{total}</td>
									<td>
										<div className='flex items-center gap-x-2'>
											<EditButton
												href={`/quotations/${quotation.number}/update`}
											/>
											<Link href={`/quotations/${quotation.number}`}>
												<EyeIcon />
											</Link>
										</div>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default QuotationsTable
