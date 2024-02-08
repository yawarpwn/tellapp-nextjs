import { EyeIcon, StartIcon } from '@/icons'
import { fetchFilteredQuotations } from '@/lib/data/quotations'
import { getIgv } from '@/utils'
import { formatDateToLocal } from '@/utils'
import Link from 'next/link'
import { EditButton } from '../buttons'

function TableRow({ quotation }) {
	const { formatedTotal } = getIgv(quotation.items)
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
					<p className='w-[360px]'>{quotation.company}</p>
					<p>{quotation.ruc}</p>
				</div>
			</td>
			<td>
				<span className='text-xs'>
					{formatDateToLocal(quotation.created_at)}
				</span>
			</td>
			<td>
				<div className='text-xs'>
					{formatedTotal}
				</div>
			</td>
			<td>
				<div className='flex items-center gap-x-2'>
					<EditButton
						href={`/quotations/${quotation.number}/update`}
					/>
					<Link href={`/quotations/${quotation.number}`}>
						<EyeIcon />
					</Link>
					<button
						className={quotation.is_regular_customer
							? 'text-primary'
							: 'text-base-300'}
					>
						{quotation.is_regular_customer
							? <StartIcon filled />
							: <StartIcon />}
					</button>
				</div>
			</td>
		</tr>
	)
}

function QuotationCard({ quotation }) {
	const { formatedTotal } = getIgv(quotation.items)

	return (
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
							{quotation.ruc ?? 'xxxxxxxxxxx'}
						</div>
					</div>
					<p className='text-xs text-base-content/70'>
						{quotation.company ?? 'Sin RUC'}
					</p>
				</div>
				<div className='flex w-full items-center justify-between'>
					<p>
						{formatedTotal}
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
	)
}

async function QuotationsTable({ query, currentPage }) {
	const quotations = await fetchFilteredQuotations({ query, currentPage })
	return (
		<div className='mt-2'>
			<div className='md:hidden flex flex-col gap-2'>
				{quotations?.map(quotation => (
					<QuotationCard key={quotation.id} quotation={quotation} />
				))}
			</div>
			<div className='overflow-x-auto'>
				<table className='table hidden md:block'>
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
							<TableRow
								key={quotation.id}
								quotation={quotation}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default QuotationsTable
