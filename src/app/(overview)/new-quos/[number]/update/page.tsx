import Breadcrumbs from '@/components/breadcrumbs'
import { QuotationUpdateStoreProvider } from '@/providers/quotation-update-store-provider'
import { fetchQuotationByNumber } from '@/lib/data/quotations'
import { QuotationUpdate } from './_components/quotation-update'
import { CustomersModel, ProductsModel } from '@/models'
export default async function Page({
  params,
}: {
  params?: { number?: string }
}) {
  const number = Number(params?.number)
  const [quotation, customers, products] = await Promise.all([
    fetchQuotationByNumber({ number }),
    CustomersModel.getAll(),
    ProductsModel.getAll(),
  ])
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Cotizaciones',
            href: '/new-quos',
          },
          {
            label: 'Editar',
            href: '/new-quos/crear',
            active: true,
          },
        ]}
      />
      <QuotationUpdateStoreProvider
        customers={customers}
        quo={quotation}
        products={products}
      >
        <QuotationUpdate />
      </QuotationUpdateStoreProvider>
    </>
  )
}
