import { DataTable } from '@/components/data-table'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { AgenciesModel } from '@/models/agencies'
import { LabelsModel } from '@/models/labels'
import { LabelsProvider } from '@/providers/labels-provider'
import { Suspense } from 'react'
import { CreateLabelDialog } from './_components/create-label-dialog'
import { labelColumns } from './_components/label-columns'

async function ProductTable() {
  const { data: labels, error: labelsError } = await LabelsModel.getAll()

  if (labelsError) return

  const { data: agencies, error: agenciesError } = await AgenciesModel.getAll()

  if (agenciesError) return

  return (
    <LabelsProvider agencies={agencies}>
      <DataTable createComponent={<CreateLabelDialog />} columns={labelColumns} data={labels} />
    </LabelsProvider>
  )
}

export default async function Page() {
  return (
    <Suspense
      fallback={<DataTableSkeleton columnCount={5} rowCount={20} searchableColumnCount={1} />}
    >
      <ProductTable />
    </Suspense>
  )
}
