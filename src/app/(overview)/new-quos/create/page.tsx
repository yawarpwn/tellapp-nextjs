import { fetchCustomers } from '@/lib/data/customers'
import ClientPage from './page.client'

export default async function Page() {
	const customers = await fetchCustomers()

	return <ClientPage customers={customers} />
}
