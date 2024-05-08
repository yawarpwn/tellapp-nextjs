import { SIGNALS_CATEGORIES } from '@/constants'
import { GalleryImageSchema } from '@/schemas/gallery'
import {
  ProductCreateSchema,
  ProductSchema,
  ProductUpdateSchema,
} from '@/schemas/products'
import {
  QuotationCreateSchema,
  QuotationSchema,
  QuotationUpdateSchema,
} from '@/schemas/quotations'
import {
  SignalCreateSchema,
  SignalSchema,
  SignalUpdateSchema,
} from '@/schemas/signal'
import { z } from 'zod'

export type CustomerType = {
  id: string
  name: string
  ruc: string
  address: string
}

export interface Items {
  id: string
  qty: number
  price: number
  unit_size: string
  description: string
}

export interface PageProps {
  searchParams?: {
    [key: string]: string | undefined
  }
}

// Quotations
export type QuotationCreateType = z.infer<typeof QuotationCreateSchema>
export type QuotationCreateWithItems = QuotationCreateType & {
  items: QuotationItemType[]
}
export type QuotationType = z.infer<typeof QuotationSchema>
export type QuotationUpdateType = z.infer<typeof QuotationUpdateSchema>
export type QuotationItemType = z.infer<typeof QuotationSchema>['items'][0]

// Signals
export type SignalType = z.infer<typeof SignalSchema>
export type SignalUpdateType = z.infer<typeof SignalUpdateSchema>
export type SignalCreateType = z.infer<typeof SignalCreateSchema>
export type SignalCategory = keyof typeof SIGNALS_CATEGORIES

// Product
export type ProductType = z.infer<typeof ProductSchema>
export type ProductId = ProductType['id']
export type ProductCreateType = z.infer<typeof ProductCreateSchema>
export type ProductUpdateType = z.infer<typeof ProductUpdateSchema>

// Gallery
export type GalleryImageType = z.infer<typeof GalleryImageSchema>
