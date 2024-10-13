import { Suspense } from 'react'
import { CreateSignalDialog } from './_components/create-signal-dialog'
import { signalsColumns } from './_components/signals-columns'
import { DataTable } from '@/components/data-table'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { SignalsModel } from '@/models'
import { SIGNALS_CATEGORIES } from '@/constants'

async function GalleryTable() {
  const { data: signals, error } = await SignalsModel.getAll()
  console.log(signals)
  if (error) throw error

  return (
    <DataTable
      categories={SIGNALS_CATEGORIES}
      createComponent={<CreateSignalDialog />}
      columns={signalsColumns}
      data={signals}
    />
  )
}

export default async function Page() {
  return (
    <Suspense
      fallback={<DataTableSkeleton columnCount={5} rowCount={20} searchableColumnCount={1} />}
    >
      <GalleryTable />
    </Suspense>
  )
}
