import { DataTable } from '@/components/data-table'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { Suspense } from 'react'
import { agencyColumns } from './_components/agency-columns'
import { CreateAgencyDialog } from './_components/create-agency-dialog'
import { AgenciesModel } from '@/models/agencies'
import { unstable_noStore } from 'next/cache'

async function ProductTable() {
  const { error, data: agencies } = await AgenciesModel.getAll()
  unstable_noStore()

  if (error) throw error

  return (
    <DataTable createComponent={<CreateAgencyDialog />} columns={agencyColumns} data={agencies} />
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
