import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { QuotationsModel } from '@/models'
import { Suspense } from 'react'
import { DataTable } from './data-table'
import { notFound } from 'next/navigation'

async function TableQuotationWrap() {
  const { data: quotations, error } = await QuotationsModel.getAll()

  if (error) notFound()

  return <DataTable data={quotations} />
}

export default async function Page() {
  return (
    <Suspense
      fallback={<DataTableSkeleton columnCount={4} rowCount={20} searchableColumnCount={1} />}
    >
      <TableQuotationWrap />
    </Suspense>
  )
}
