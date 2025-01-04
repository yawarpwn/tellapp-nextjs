import { DataTableSkeleton } from '@/components/skeletons/data-table'

export default function Page() {
  return <DataTableSkeleton columnCount={5} rowCount={20} searchableColumnCount={1} />
}
