import { fetchCustomers } from '@/lib/data/customers'
import { columns } from './columns'
import { TableExample } from './table'

export default async function Page() {
	const customers = await fetchCustomers()
	return <TableExample columns={columns} data={customers} />
}
