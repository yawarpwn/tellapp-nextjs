import Breadcrumbs from '@/components/breadcrumbs'
import { CreateUpdatePage } from '@/components/quotations/create-update-page'
import { QuotationStoreProvider } from '@/hooks/use-quotation-store'
import { fetchCustomers } from '@/lib/data/customers'
import { fetchProducts } from '@/lib/data/products'
import { fetchLastQuotation } from '@/lib/data/quotations'

export default async function Page() {
	const [customers, products, lastQuotation] = await Promise.all([
		fetchCustomers(),
		fetchProducts(),
		fetchLastQuotation(),
	])

	return (
		<div className='flex flex-col gap-4'>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: 'Cotizaciones',
						href: '/new-quos',
					},
					{
						label: 'Crear',
						href: '/new-quos/crear',
						active: true,
					},
				]}
			/>
			<QuotationStoreProvider
				customers={customers}
				products={products}
				quoNumber={lastQuotation.number + 1}
			>
				<CreateUpdatePage />
			</QuotationStoreProvider>
		</div>
	)
}
