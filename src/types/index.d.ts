import { SIGNALS_CATEGORIES } from '@/constants'
export { Product } from '@/schemas'
export { GalleryImage } from '@/schemas/gallery'
export { Quotation, QuotationItem, QuotationUpdate } from '@/schemas/quotations'
export { Signal, SignalCreate, SignalUpdate } from '@/schemas/signal'
import { CreateQuotation } from '@/schemas/quotations'
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

type QuotationCreateType = z.infer<typeof CreateQuotation>

export interface QuotationCreateType {
	number: string
}
