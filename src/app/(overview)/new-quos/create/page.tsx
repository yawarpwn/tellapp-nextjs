import Breadcrumbs from '@/components/breadcrumbs'
import { QuotationCreateStoreProvider } from '@/providers/quotation-create-store-provider'
import { CustomersModel, ProductsModel } from '@/models'
import { QuotationCreate } from './_components/quotation-create'

export default async function Page() {
  const [customers, products] = await Promise.all([
    CustomersModel.getAll(),
    ProductsModel.getAll(),
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
      <QuotationCreateStoreProvider products={products} customers={customers}>
        <QuotationCreate />
      </QuotationCreateStoreProvider>
    </div>
  )
}
