import { columns, Payment } from './columns'
import { DataTable } from './data-table'

import { fetchQuotations } from '@/lib/data/quotations'

export default async function DemoPage() {
	const data = await fetchQuotations()

	const columns = [{
		accesorKey: 'number',
		header: 'No',
	}, {
		accesorKey: 'company',
		header: 'Cliente',
	}, {
		accesorKey: 'ruc',
		header: 'Ruc',
	}, {
		accesorKey: 'date',
		header: 'Fecha',
	}, {
		accesorKey: 'total',
		header: 'total',
	}]

	return (
		<div className='container mx-auto '>
			<DataTable columns={columns} data={data} columns={columns} />
		</div>
	)
}
