import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { fetchQuotations } from '@/lib/data/quotations'
import { Suspense } from 'react'
import { DataTable } from './data-table'

async function TableQuotationWrap() {
	const quotations = await fetchQuotations()
	return <DataTable data={quotations} />
}

export default async function Page() {
	return (
		<Suspense
			fallback={
				<DataTableSkeleton
					columnCount={4}
					rowCount={20}
					searchableColumnCount={1}
				/>
			}
		>
			<TableQuotationWrap />
		</Suspense>
	)
}
