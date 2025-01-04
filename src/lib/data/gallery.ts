import { GalleryModel } from '@/models'
import type { Gallery } from '@/types'

export async function fetchGalleryPhotos(): Promise<Gallery[]> {
  const { data, error } = await GalleryModel.getAll()
  if (error) throw error
  return data
}
