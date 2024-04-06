import Breadcrumbs from '@/components/breadcrumbs'
import { CreateUpdatePage } from '@/components/quotations/create-update-page'
import { QuotationStoreProvider } from '@/hooks/use-quotation-store'
import { fetchCustomers } from '@/lib/data/customers'
import { fetchProducts } from '@/lib/data/products'

export default async function Page() {
	const [customers, products] = await Promise.all([
		fetchCustomers(),
		fetchProducts(),
	])

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: 'Cotizaciones',
						href: '/quotations',
					},
					{
						label: 'Crear',
						href: '/quotations/crear',
						active: true,
					},
				]}
			/>
			<QuotationStoreProvider customers={customers} products={products}>
				<CreateUpdatePage customers={customers} />
			</QuotationStoreProvider>
		</>
	)
}
