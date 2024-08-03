import { GALLERY_CATEGORIES } from '@/constants'
import { z } from 'zod'

export const GalleryImageSchema = z.object({
  title: z.string(),
  id: z.string(),
  category: z.nativeEnum(GALLERY_CATEGORIES),
  url: z.string(),
  public_id: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
})
