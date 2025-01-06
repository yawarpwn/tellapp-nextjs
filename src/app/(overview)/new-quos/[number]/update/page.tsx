import Breadcrumbs from '@/components/breadcrumbs'
import { QuotationUpdateStoreProvider } from '@/providers/quotation-update-store-provider'
import { QuotationUpdate } from './_components/quotation-update'
import { UpdateCreateQuotationSkeleton } from '@/components/skeletons/quotations'
import { Suspense } from 'react'
import { fetchCustomers } from '@/lib/data/customers'
import { fetchProducts } from '@/lib/data/products'
import { fetchQuotationByNumber } from '@/lib/data/quotations'
import { notFound } from 'next/navigation'
export async function QuotationUpdateServer({ quoNumber }: { quoNumber: number }) {
  const [customers, products, quotation] = await Promise.all([
    fetchCustomers(),
    fetchProducts(),
    fetchQuotationByNumber(quoNumber),
  ])

  if (!quotation) {
    notFound()
  }
  // const { data: customers, error: customersError } = await CustomersModel.getAll()
  // const { data: products, error: productsError } = await ProductsModel.getAll()
  // const { data: quotation, error: quotationError } = await QuotationsModel.getByNumber(quoNumber)

  const filteredCustomers = customers.filter(c => c.isRegular)
  return (
    <QuotationUpdateStoreProvider customers={filteredCustomers} quo={quotation} products={products}>
      <QuotationUpdate />
    </QuotationUpdateStoreProvider>
  )
}

export default async function Page(props: { params?: Promise<{ number?: string }> }) {
  const params = await props.params
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
            label: ` #${number}`,
            href: `/new-quos/${number}/update`,
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
