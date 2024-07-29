import { NoResultRow } from '@/components/no-result-row'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { fetchFilteredGallery } from '@/lib/data/gallery'
import { TrashIcon } from 'lucide-react'
import {
  GalleryDeleteFormButton,
  GalleryEditFormButton,
} from './gallery-buttons'

export async function GalleryTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const galleryImages = await fetchFilteredGallery(query, currentPage)
  console.log(galleryImages)
  const hasGalleryImages = galleryImages && galleryImages.length > 0
  return (
    <div className="overflow-x-auto">
      <Table className="table-sm table">
        <TableHeader>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Ancho</TableCell>
            <TableCell>Alto</TableCell>
            <TableCell>Formato</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hasGalleryImages ? (
            galleryImages.map(photo => (
              <TableRow key={photo.id}>
                <TableCell>
                  <div className="h-12 w-12 ">
                    <img
                      alt={photo.title}
                      className="h-full w-full object-contain"
                      src={`https://res.cloudinary.com/tellsenales-cloud/image/upload/c_scale,w_40/${photo.public_id}.${photo.format}`}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="min-w-[250px]">{photo.title}</div>
                </TableCell>
                <TableCell>{photo.category}</TableCell>
                <TableCell>{photo.width}</TableCell>
                <TableCell>{photo.height}</TableCell>
                <TableCell>{photo.format}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <GalleryEditFormButton galleryImage={photo} />
                    <GalleryDeleteFormButton
                      id={photo.id}
                      publicId={photo.public_id}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <NoResultRow query={query} colSpan={7} />
          )}
        </TableBody>
      </Table>
    </div>
  )
}
