import { CreateGalleryDialog } from './_components/create-gallery-dialog'
import { galleryColumns } from './_components/gallery-columns'
import { DataTable } from '@/components/data-table'
import { GalleryModel } from '@/models'
import { GALLERY_CATEGORIES } from '@/constants'

export default async function Page() {
  const { data: galllery, error } = await GalleryModel.getAll()
  if (error) throw error

  return (
    <DataTable
      categories={GALLERY_CATEGORIES}
      createComponent={<CreateGalleryDialog />}
      columns={galleryColumns}
      data={galllery}
    />
  )
}
