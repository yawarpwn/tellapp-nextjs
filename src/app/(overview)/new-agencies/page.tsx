import { DataTable } from '@/components/data-table'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { fetchAgencies } from '@/lib/data/agencies'
import { Suspense } from 'react'
import { agencyColumns } from './_components/agency-columns'
import { CreateAgencyDialog } from './_components/create-agency-dialog'

async function ProductTable() {
  const agencies = await fetchAgencies()

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
