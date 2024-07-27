import Breadcrumbs from '@/components/breadcrumbs'
import { QuotationStoreProvider } from '@/hooks/use-quotation-store'
import { fetchLastQuotation } from '@/lib/data/quotations'
import { CreateUpdatePage } from '../_components/create-update-page'
import { CustomersModel, ProductsModel } from '@/models'

export default async function Page() {
  const [customers, products, lastQuotation] = await Promise.all([
    CustomersModel.getAll(),
    ProductsModel.getAll(),
    fetchLastQuotation(),
  ])

  return (
    <div className="flex flex-col gap-4">
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
