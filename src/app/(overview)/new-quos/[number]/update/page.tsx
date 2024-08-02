import Breadcrumbs from '@/components/breadcrumbs'
import { QuotationUpdateStoreProvider } from '@/providers/quotation-update-store-provider'
import { fetchQuotationByNumber } from '@/lib/data/quotations'
import { QuotationUpdate } from './_components/quotation-update'
import { CustomersModel, ProductsModel } from '@/models'
import { UpdateCreateQuotationSkeleton } from '@/components/skeletons/quotations'
import { Suspense } from 'react'

export async function QuotationUpdateServer({
  quoNumber,
}: {
  quoNumber: number
}) {
  const [quotation, customers, products] = await Promise.all([
    fetchQuotationByNumber({ number: quoNumber }),
    CustomersModel.getAll(),
    ProductsModel.getAll(),
  ])
  return (
    <QuotationUpdateStoreProvider
      customers={customers}
      quo={quotation}
      products={products}
    >
      <QuotationUpdate />
    </QuotationUpdateStoreProvider>
  )
}

export default async function Page({
  params,
}: {
  params?: { number?: string }
}) {
  const number = Number(params?.number)
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
      <Suspense fallback={<UpdateCreateQuotationSkeleton />}>
        <QuotationUpdateServer quoNumber={number} />
      </Suspense>
    </>
  )
}
