import Breadcrumbs from '@/components/breadcrumbs'
import { QuotationStoreProvider } from '@/hooks/use-quotation-store'
import { fetchQuotationByNumber } from '@/lib/data/quotations'
import { CreateUpdatePage } from '../../_components/create-update-page'
import { CustomersModel, ProductsModel } from '@/models'
export default async function Page({
  params,
}: {
  params?: { number?: string }
}) {
  const number = Number(params?.number)
  const quotation = await fetchQuotationByNumber({ number })
  const customers = await CustomersModel.getAll()
  const products = await ProductsModel.getAll()
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
      <QuotationStoreProvider
        customers={customers}
        products={products}
        isUpdate
        quoNumber={quotation.number}
        quo={{
          id: quotation.id,
          ruc: quotation.ruc,
          company: quotation.company,
          address: quotation.address,
          deadline: quotation.deadline,
          include_igv: quotation.include_igv,
          is_regular_customer: quotation.is_regular_customer,
          created_at: quotation.created_at,
          updated_at: quotation.updated_at,
          credit: quotation.credit,
        }}
        items={quotation.items}
      >
        <CreateUpdatePage />
      </QuotationStoreProvider>
    </>
  )
}
