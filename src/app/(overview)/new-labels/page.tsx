import { DataTable } from '@/components/data-table'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { AgenciesModel } from '@/models/agencies'
import { LabelsModel } from '@/models/labels'
import { LabelsProvider } from '@/providers/labels-provider'
import { Suspense } from 'react'
import { CreateLabelDialog } from './_components/create-label-dialog'
import { labelColumns } from './_components/label-columns'
import { notFound } from 'next/navigation'

async function ProductTable() {
  const [labelsResponse, agenciesResponse] = await Promise.all([
    LabelsModel.getAll(),
    AgenciesModel.getAll(),
  ])

  return (
    <LabelsProvider agencies={agenciesResponse.data!}>
      <DataTable
        createComponent={<CreateLabelDialog />}
        columns={labelColumns}
        data={labelsResponse.data!}
      />
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
