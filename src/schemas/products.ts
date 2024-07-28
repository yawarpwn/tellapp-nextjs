import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { productsTable } from '@/db/schemas'
import { z } from 'zod'
import { PRODUCT_CATEGORIES } from '@/constants'

export const ProductSchema = createSelectSchema(productsTable, {
  category: () => z.nativeEnum(PRODUCT_CATEGORIES),
})
export const ProductInsertSchema = createInsertSchema(productsTable, {
  cost: () => z.coerce.number().positive(),
  price: () => z.coerce.number().positive(),
  category: () => z.nativeEnum(PRODUCT_CATEGORIES),
})

export const ProductUpdateSchema = ProductSchema.omit({
  id: true,
  rank: true,
  createdAt: true,
  updatedAt: true,
})

export type Product = z.infer<typeof ProductSchema>
export type ProductInsert = z.infer<typeof ProductInsertSchema>
export type ProductUpdate = Partial<z.infer<typeof ProductUpdateSchema>>
export type ProductIdType = Product['id']
