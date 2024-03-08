import { SIGNALS_CATEGORIES } from '@/constants'
export { Product } from '@/schemas'
export interface GalleryImage {
	publicId: string
	url: string
	thumb: string
}

export interface Items {
	id: string
	qty: number
	price: number
	unit_size: string
	description: string
}

export interface Quotation {
	id: string
	number: number
	company?: string
	ruc?: string
	address?: string
	deadline: number
	phone?: string
	created_at: string
	items: Items[]
	is_regular_customer: boolean
}

export type SignalCategory = keyof typeof SIGNALS_CATEGORIES

export interface Signal {
	name: string
	id: string
	code: string
	category: SignalCategory
	url: string
	public_id: string
	width: number
	height: number
	format: string
}
