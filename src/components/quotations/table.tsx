import { NoResultRow } from '@/components/no-result-row'
import { TextGradient } from '@/components/text-gradient'
import { EyeIcon } from '@/icons'
import { fetchFilteredQuotations } from '@/lib/data/quotations'
import { getIgv } from '@/lib/utils'
import { formatDateToLocal } from '@/lib/utils'
import type { QuotationType } from '@/types'
import Link from 'next/link'
import { EditButton } from '../buttons'
import { RegularCustomerToggle } from './regular-customer-toggle'

function TableRow({ quotation }: {
	quotation: QuotationType
}) {
	const { formatedTotal } = getIgv(quotation.items)
	return (
		<tr>
			<td>
				<Link href={`/quotations/${quotation.number}`}>
					<TextGradient className='font-bold text-lg' as='span'>#</TextGradient>
					{quotation.number}
				</Link>
			</td>
			<td>
				<p className='min-w-[250px]'>{quotation.company}</p>
				<p>{quotation.ruc}</p>
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
					<Link
						href={`/quotations/${quotation.number}`}
						className='btn btn-sm'
					>
						<EyeIcon size={20} />
					</Link>
					<RegularCustomerToggle active={quotation.is_regular_customer} />
				</div>
			</td>
		</tr>
	)
}

function QuotationRows({ quotations }: { quotations: QuotationType[] }) {
	return quotations.map(quotation => (
		<TableRow
			key={quotation.id}
			quotation={quotation}
		/>
	))
}

function QuotationCard({ quotation }: {
	quotation: QuotationType
}) {
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
						<RegularCustomerToggle active={quotation.is_regular_customer} />
						<EditButton
							href={`/quotations/${quotation.number}/update`}
						/>
						<Link
							href={`/quotations/${quotation.number}`}
							className='btn btn-sm'
						>
							<EyeIcon size={20} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

async function QuotationsTable({ query, currentPage }: {
	query: string
	currentPage: number
}) {
	const quotations = await fetchFilteredQuotations({ query, currentPage })

	const hasQuotations = quotations.length > 0
	return (
		<div className='mt-2 w-full'>
			<>
				<div className='md:hidden flex flex-col gap-2'>
					{hasQuotations
						? quotations?.map(quotation => (
							<QuotationCard key={quotation.id} quotation={quotation} />
						))
						: (
							<div className='h-[650px] flex items-center justify-center'>
								<p>
									No se encontraro resultados para <strong>{query}</strong>
								</p>
							</div>
						)}
				</div>
				<div className='overflow-x-auto'>
					<table className='table hidden md:table'>
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
							{hasQuotations
								? <QuotationRows quotations={quotations} />
								: <NoResultRow query={query} colSpan={6} />}
						</tbody>
					</table>
				</div>
			</>
		</div>
	)
}

export default QuotationsTable
