import Breadcrumbs from '@/components/breadcrumbs'
import { QuotationUpdateStoreProvider } from '@/providers/quotation-update-store-provider'
import { QuotationUpdate } from './_components/quotation-update'
import { CustomersModel, ProductsModel, QuotationsModel } from '@/models'
import { UpdateCreateQuotationSkeleton } from '@/components/skeletons/quotations'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
export async function QuotationUpdateServer({
  quoNumber,
}: {
  quoNumber: number
}) {
  const { data: customers, error: customersError } =
    await CustomersModel.getAll()
  const { data: products, error: productsError } = await ProductsModel.getAll()
  const { data: quotation, error: quotationError } =
    await QuotationsModel.getByNumber(quoNumber)

  if (customersError || productsError || quotationError) {
    notFound()
  }
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
