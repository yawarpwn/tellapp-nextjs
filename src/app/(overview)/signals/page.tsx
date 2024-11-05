import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/skeletons/data-table'

import { SignalTableServer } from './signals-table-server'

export default async function Page() {
  return (
    <Suspense
      fallback={<DataTableSkeleton columnCount={5} rowCount={20} searchableColumnCount={1} />}
    >
      <SignalTableServer />
    </Suspense>
  )
}
