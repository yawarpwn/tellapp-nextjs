import { SIGNALS_CATEGORIES } from '@/constants'
import { GalleryImageSchema } from '@/schemas/gallery'
import { z } from 'zod'

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

import {
  customerCreateSchema,
  customerSchema,
  customerUpdateSchema,
} from '@/schemas/customers'

import {
  agencieCreateSchema,
  agencieUpdateSchema,
  agencySceham,
} from '@/schemas/agencies'

import {
  labelCreateSchema,
  labelSchema,
  labelUpdateSchema,
} from '@/schemas/labels'

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

// Labels
export type LabelType = z.infer<typeof labelSchema>
export type LabelCreateType = z.infer<typeof labelCreateSchema>
export type LabelUpdateType = z.infer<typeof labelUpdateSchema>

// Agency
export type AgencyType = z.infer<typeof agencySceham>
export type AgencyCreateType = z.infer<typeof agencieCreateSchema>
export type AgencyUpdateType = z.infer<typeof agencieUpdateSchema>

// Customer
export type CustomerType = z.infer<typeof customerSchema>
export type CustomerCreateType = z.infer<typeof customerCreateSchema>
export type CustomerUpdateType = z.infer<typeof customerUpdateSchema>

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
