import { DataTable } from '@/components/data-table'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { fetchLabels } from '@/lib/data/labels'
import { Suspense } from 'react'
import { CreateLabelDialog } from './_components/create-label-dialog'
import { customerColumns } from './_components/label-columns'

async function ProductTable() {
  const labels = await fetchLabels()

  return (
    <DataTable
      createComponent={<CreateLabelDialog />}
      columns={customerColumns}
      data={labels}
    />
  )
}

export default async function Page() {
  return (
    <Suspense
      fallback={
        <DataTableSkeleton
          columnCount={5}
          rowCount={20}
          searchableColumnCount={1}
        />
      }
    >
      <ProductTable />
    </Suspense>
  )
}
