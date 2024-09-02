import { Suspense } from 'react'
import { CreateGalleryDialog } from './_components/create-gallery-dialog'
import { galleryColumns } from './_components/gallery-columns'
import { DataTable } from '@/components/data-table'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { GalleryModel } from '@/models'

async function GalleryTable() {
  const { data: galllery, error } = await GalleryModel.getAll()
  if (error) throw error

  return (
    <DataTable createComponent={<CreateGalleryDialog />} columns={galleryColumns} data={galllery} />
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
