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
  // const [labelsResponse, agenciesResponse] = await Promise.all([
  //   LabelsModel.getAll(),
  //   AgenciesModel.getAll(),
  // ])

  const { data: labelsResponse, error: labelsError } = await LabelsModel.getAll()
  const { data: agenciesResponse, error: agenciesError } = await AgenciesModel.getAll()

  if (labelsError || agenciesError) {
    notFound()
  }

  // if (labelsResponse.error) throw labelsResponse.error
  // if (agenciesResponse.error) throw agenciesResponse.error

  return (
    <LabelsProvider agencies={agenciesResponse}>
      <DataTable
        createComponent={<CreateLabelDialog />}
        columns={labelColumns}
        data={labelsResponse}
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
