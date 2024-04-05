import { fetchCustomers } from '@/lib/data/customers'
import { fetchQuotationById } from '@/lib/data/quotations'
import ClientPage from '../../create/page.client'
export default async function Page(
	{ params }: { params?: { number?: string } },
) {
	const number = Number(params?.number)
	const quotation = await fetchQuotationById({ number })
	const customers = await fetchCustomers()
	return (
		<div>
			<ClientPage customers={customers} quotation={quotation} />
		</div>
	)
}
