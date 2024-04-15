import { CreateUpdatePage } from '@/components/quotations/create-update-page'
import { QuotationStoreProvider } from '@/hooks/use-quotation-store'
import { fetchCustomers } from '@/lib/data/customers'
import { fetchProducts } from '@/lib/data/products'
import { fetchQuotationById } from '@/lib/data/quotations'
export default async function Page(
	{ params }: { params?: { number?: string } },
) {
	const number = Number(params?.number)
	const quotation = await fetchQuotationById({ number })
	const customers = await fetchCustomers()
	const products = await fetchProducts()
	return (
		<QuotationStoreProvider
			customers={customers}
			products={products}
			isUpdate
			quo={{
				id: quotation.id,
				ruc: quotation.ruc,
				company: quotation.company,
				address: quotation.address,
				deadline: quotation.deadline,
				include_igv: quotation.include_igv,
				is_regular_customer: quotation.is_regular_customer,
			}}
			items={quotation.items}
		>
			<CreateUpdatePage />
		</QuotationStoreProvider>
	)
}
