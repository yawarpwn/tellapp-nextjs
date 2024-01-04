import { EyeIcon } from '@/icons'
import { fetchFilteredQuotations } from '@/lib/quotations-data'
import { getIgv } from '@/utils'
import { formatDateToLocal } from '@/utils'
import Link from 'next/link'
import React from 'react'
import { EditButton } from '../buttons'

function TableRow({ quotation }) {
	return (
		<tr>
			<td>
				<Link href={`/quotations/${quotation.number}`}>
					<span className='text-primary font-bold'>#</span>
					{quotation.number}
				</Link>
			</td>
			<td>
				<div>
					<p className='w-[340px]'>{quotation.company}</p>
					<p>{quotation.ruc}</p>
				</div>
			</td>
			<td>
				<span className='text-xs'>
					{formatDateToLocal(quotation.created_at)}
				</span>
			</td>
			<td>
				{getIgv(quotation.items).total}
			</td>
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
}

async function QuotationsTable({ query, currentPage }) {
	const quotations = await fetchFilteredQuotations({ query, currentPage })
	return (
		<div>
			<div className='lg:hidden flex flex-col gap-2'>
				{quotations?.map((quotation) => (
					<div
						key={quotation.id}
						className='card card-compact'
					>
						<div className='card-body bg-base-200'>
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
							<div className='flex w-full items-center justify-between'>
								<p>
									S/ {getIgv(quotation.items).total}
								</p>
								<p>{formatDateToLocal(quotation.created_at)}</p>
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
					</div>
				))}
			</div>
			<div className='overflow-x-auto'>
				<table className='table hidden lg:block'>
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
						{quotations?.map(quotation => (
							<TableRow key={quotation.id} quotation={quotation} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default QuotationsTable
