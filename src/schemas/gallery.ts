import { GALLERY_CATEGORIES } from '@/constants'
import { z } from 'zod'
import { galleryTable } from '@/db/schemas'

import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const GallerySchema = createSelectSchema(galleryTable)
export const GalleryInsertSchema = createInsertSchema(galleryTable, {
  category: z.nativeEnum(GALLERY_CATEGORIES),
})
export const GalleryUpdateSchema = GalleryInsertSchema.partial().omit({
  id: true,
  updatedAt: true,
  createdAt: true,
})
export type Gallery = z.infer<typeof GallerySchema> & {
  thumbUrl: string
}
export type GalleryInsert = z.infer<typeof GalleryInsertSchema>
export type GalleryUpdate = Partial<z.infer<typeof GalleryInsertSchema>>
