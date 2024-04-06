import { QuotationStoreProvider } from '@/hooks/use-quotation-store'
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
		<QuotationStoreProvider
			quo={{
				ruc: quotation.ruc,
				company: quotation.company,
				address: quotation.address,
				deadline: quotation.deadline,
				include_igv: quotation.include_igv,
				is_regular_customer: quotation.is_regular_customer,
			}}
			items={quotation.items}
		>
			<ClientPage customers={customers} />
		</QuotationStoreProvider>
	)
}
