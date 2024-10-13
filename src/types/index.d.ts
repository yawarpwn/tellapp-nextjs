import { SIGNALS_CATEGORIES } from '@/constants'
import { GALLERY_CATEGORIES } from '@/constants'
import { GalleryImageSchema } from '@/schemas/gallery'
export type * from './database.d.ts'
import { z } from 'zod'
//Quotations
export type * from '@/schemas'

import { SignalCreateSchema, SignalSchema, SignalUpdateSchema } from '@/schemas/signal'

export interface PageProps {
  searchParams?: {
    [key: string]: string | undefined
  }
}

// Signals
export type SignalType = z.infer<typeof SignalSchema>
export type SignalUpdateType = z.infer<typeof SignalUpdateSchema>
export type SignalCreateType = z.infer<typeof SignalCreateSchema>
export type SignalCategory = (typeof SIGNALS_CATEGORIES)[keyof typeof SIGNALS_CATEGORIES]
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[keyof typeof GALLERY_CATEGORIES]

// Gallery
export type GalleryImageType = z.infer<typeof GalleryImageSchema>
