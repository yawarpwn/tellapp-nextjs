import Breadcrumbs from '@/components/breadcrumbs'
import { QuotationCreateStoreProvider } from '@/providers/quotation-create-store-provider'
import { UpdateCreateQuotationSkeleton } from '@/components/skeletons/quotations'
import { QuotationCreate } from './_components/quotation-create'
import { fetchProducts } from '@/lib/data/products'
import { fetchCustomers } from '@/lib/data/customers'
import { Suspense } from 'react'

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
        <QuotationCreateStoreProvider getCustomers={fetchCustomers()} getProducts={fetchProducts()}>
          <QuotationCreate />
        </QuotationCreateStoreProvider>
      </Suspense>
    </div>
  )
}
