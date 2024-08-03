import { SIGNALS_CATEGORIES } from '@/constants'
import { GalleryImageSchema } from '@/schemas/gallery'
export type * from './database.d.ts'
import { z } from 'zod'
//Quotations
export type * from '@/schemas'

import { SignalCreateSchema, SignalSchema, SignalUpdateSchema } from '@/schemas/signal'

import { agencieCreateSchema, agencieUpdateSchema, agencySchema } from '@/schemas/agencies'

import { labelCreateSchema, labelSchema, labelUpdateSchema } from '@/schemas/labels'

export interface PageProps {
  searchParams?: {
    [key: string]: string | undefined
  }
}

// Labels
export type LabelType = z.infer<typeof labelSchema>
export type LabelCreateType = z.infer<typeof labelCreateSchema>
export type LabelUpdateType = z.infer<typeof labelUpdateSchema>

// Signals
export type SignalType = z.infer<typeof SignalSchema>
export type SignalUpdateType = z.infer<typeof SignalUpdateSchema>
export type SignalCreateType = z.infer<typeof SignalCreateSchema>
export type SignalCategory = keyof typeof SIGNALS_CATEGORIES

// Gallery
export type GalleryImageType = z.infer<typeof GalleryImageSchema>
