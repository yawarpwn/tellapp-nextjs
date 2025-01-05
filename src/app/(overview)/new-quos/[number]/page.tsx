import Breadcrumbs from '@/components/breadcrumbs'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { QuotationSkeleton } from '@/components/skeletons/quotations'
import { Suspense } from 'react'
import { QuotationPageByNumber } from '../_components/quotation-page-by-number'
import { fetchQuotationByNumber } from '@/lib/data/quotations'
import { notFound } from 'next/navigation'

async function QuotationPage(props: { params: Promise<{ number: string }> }) {
  const params = await props.params
  const quotationNumber = Number(params.number)

  const quotation = await fetchQuotationByNumber(quotationNumber)

  if (!quotation) {
    notFound()
  }
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Cotizaciones',
            href: '/new-quos',
          },
          {
            label: ` #${quotationNumber}`,
            href: `/new-quos/${quotationNumber}`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={<QuotationSkeleton />}>
        <QuotationPageByNumber quotation={quotation} />
      </Suspense>
    </div>
  )
}

export default QuotationPage
