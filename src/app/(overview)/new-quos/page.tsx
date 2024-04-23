import { fetchQuotations } from '@/lib/data/quotations'
import { columns } from './columns'
import { DataTable } from './data-table'

export default async function Page() {
	const quotations = await fetchQuotations()
	return <DataTable data={quotations} columns={columns} />
}
