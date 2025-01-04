import { DataTableSkeleton } from '@/components/skeletons/data-table'

export default function Loading() {
  return <DataTableSkeleton columnCount={4} rowCount={20} searchableColumnCount={1} />
}
