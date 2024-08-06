import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { QuotationsModel } from '@/models'
import { Suspense } from 'react'
import { DataTable } from './data-table'

async function TableQuotationWrap() {
  const { data: quotations, error } = await QuotationsModel.getAll()

  if (error) throw error

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
