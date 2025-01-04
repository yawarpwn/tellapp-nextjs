import { CreateGalleryDialog } from './_components/create-gallery-dialog'
import { galleryColumns } from './_components/gallery-columns'
import { DataTable } from '@/components/data-table'
import { GalleryModel } from '@/models'
import { GALLERY_CATEGORIES } from '@/constants'
import { fetchGalleryPhotos } from '@/lib/data/gallery'

export default async function Page() {
  const gallery = await fetchGalleryPhotos()
  console.log('Total Galleries: ', gallery.length)

  return (
    <DataTable
      categories={GALLERY_CATEGORIES}
      createComponent={<CreateGalleryDialog />}
      columns={galleryColumns}
      data={gallery}
    />
  )
}
