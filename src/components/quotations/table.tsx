import { NoResultRow } from '@/components/no-result-row'
import { TextGradient } from '@/components/text-gradient'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { EyeIcon } from '@/icons'
import { fetchFilteredQuotations } from '@/lib/data/quotations'
import { getIgv } from '@/lib/utils'
import { formatDateToLocal } from '@/lib/utils'
import type { QuotationType } from '@/types'
import Link from 'next/link'
import { EditButton } from '../buttons'
import { RegularCustomerToggle } from './regular-customer-toggle'

function QuotationTableRow({ quotation }: {
	quotation: QuotationType
}) {
	const { formatedTotal } = getIgv(quotation.items)
	return (
		<TableRow>
			<TableCell>
				<Link href={`/quotations/${quotation.number}`}>
					<TextGradient className='font-bold text-lg' as='span'>#</TextGradient>
					{quotation.number}
				</Link>
			</TableCell>
			<TableCell>
				<p className='min-w-[250px]'>{quotation.company}</p>
				<p>{quotation.ruc}</p>
			</TableCell>
			<TableCell>
				<span className='text-xs'>
					{formatDateToLocal(quotation.created_at)}
				</span>
			</TableCell>
			<TableCell>
				<div className='text-xs'>
					{formatedTotal}
				</div>
			</TableCell>
			<TableCell>
				<div className='flex items-center gap-x-2'>
					<EditButton
						href={`/quotations/${quotation.number}/update`}
					/>
					<Button asChild size='icon'>
						<Link
							href={`/quotations/${quotation.number}`}
						>
							<EyeIcon size={20} />
						</Link>
					</Button>
					<RegularCustomerToggle active={quotation.is_regular_customer} />
				</div>
			</TableCell>
		</TableRow>
	)
}

function QuotationRows({ quotations }: { quotations: QuotationType[] }) {
	return quotations.map(quotation => (
		<QuotationTableRow
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
		<Card
			key={quotation.id}
			className='card card-compact'
		>
			<CardHeader>
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
			</CardHeader>
			<CardContent>
				<p className='text-xs text-base-content/70 text-center'>
					{quotation.company ?? 'Sin RUC'}
				</p>
			</CardContent>
			<CardFooter className='flex items-center justify-between'>
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
			</CardFooter>
		</Card>
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
					<Table className='hidden md:table'>
						{/* head */}
						<TableHeader>
							<TableRow>
								<TableHead>No</TableHead>
								<TableHead>Cliente</TableHead>
								<TableHead>Fecha</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Acciones</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{hasQuotations
								? <QuotationRows quotations={quotations} />
								: <NoResultRow query={query} colSpan={6} />}
						</TableBody>
					</Table>
				</div>
			</>
		</div>
	)
}

export default QuotationsTable
