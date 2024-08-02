import Breadcrumbs from '@/components/breadcrumbs'
import { QuotationCreateStoreProvider } from '@/providers/quotation-create-store-provider'
import { CustomersModel, ProductsModel } from '@/models'
import { QuotationCreate } from './_components/quotation-create'
import { Suspense } from 'react'
import { UpdateCreateQuotationSkeleton } from '@/components/skeletons/quotations'

async function CreateQuotationPageServer() {
  const [customers, products] = await Promise.all([
    CustomersModel.getAll(),
    ProductsModel.getAll(),
  ])

  return (
    <QuotationCreateStoreProvider products={products} customers={customers}>
      <QuotationCreate />
    </QuotationCreateStoreProvider>
  )
}

// export const dynamic = 'force-dynamic'
export default async function Page() {
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
      <Suspense fallback={<UpdateCreateQuotationSkeleton />}>
        <CreateQuotationPageServer />
      </Suspense>
    </div>
  )
}
