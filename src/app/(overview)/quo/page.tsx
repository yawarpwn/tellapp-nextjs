import { fetchCustomers } from '@/lib/data/customers'
import { QuoStoreProvider } from '@/providers/quo-store-provider'
import { CreateUpdateQuo } from './create-update-quo'

export default async function Page() {
	const customers = await fetchCustomers()
	return (
		<QuoStoreProvider customers={customers}>
			<CreateUpdateQuo />
		</QuoStoreProvider>
	)
}
