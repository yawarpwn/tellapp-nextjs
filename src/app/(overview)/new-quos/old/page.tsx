import { fetchCustomers } from '@/lib/data/customers'
import { fetchProducts } from '@/lib/data/products'
import { fetchQuotations } from '@/lib/data/quotations'
import { columns } from './columns'
import { DataTable } from './data-table'

export default async function Page() {
	const [quotations, customers, products] = await Promise.all([
		fetchQuotations(),
		fetchCustomers(),
		fetchProducts(),
	])
	return <DataTable data={quotations} columns={columns} />
}
