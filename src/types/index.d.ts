import { SIGNALS_CATEGORIES } from '@/constants'
export { Product } from '@/schemas'
export { GalleryImage } from '@/schemas/gallery'
import {
	QuotationCreateSchema,
	QuotationSchema,
	QuotationUpdateSchema,
} from '@/schemas/quotations'
export { Signal, SignalCreate, SignalUpdate } from '@/schemas/signal'
import { z } from 'zod'

export interface Items {
	id: string
	qty: number
	price: number
	unit_size: string
	description: string
}

export type SignalCategory = keyof typeof SIGNALS_CATEGORIES

export interface PageProps {
	searchParams?: {
		[key: string]: string | undefined
	}
}

export type QuotationCreateType = z.infer<typeof QuotationCreateSchema>
export type QuotationType = z.infer<typeof QuotationSchema>
export type QuotationUpdateType = z.infer<typeof QuotationUpdateSchema>
export type QuotationItemType = z.infer<typeof QuotationSchema>['items'][0]
