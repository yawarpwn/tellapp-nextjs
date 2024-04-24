import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import { fetchQuotations } from '@/lib/data/quotations'
import { Suspense } from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'

async function TableQuotationWrap() {
	const quotations = await fetchQuotations()
	return <DataTable data={quotations} columns={columns} />
}

export default async function Page() {
	return (
		<Suspense fallback={<TableSkeleton />}>
			<TableQuotationWrap />
		</Suspense>
	)
}
