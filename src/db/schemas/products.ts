import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { PRODUCT_CATEGORIES } from '@/constants'
import {
  text,
  pgTable,
  timestamp,
  uuid,
  integer,
  real,
} from 'drizzle-orm/pg-core'

type Categories = (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES]

export const productsTable = pgTable('_products', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  description: text('description').notNull(),
  code: text('code').unique().notNull(),
  unitSize: text('unit_size').notNull(),
  category: text('category').$type<Categories>().notNull(),
  link: text('link'),
  rank: real('rank').default(0).notNull(),
  price: real('price').notNull(), //must be 1, 2,  0.5, 5.5
  cost: real('cost').notNull(), //must be 1, 2, 0.5. 55
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// export type Product = typeof productsTable.$inferSelect
// export type ProductInsert = typeof productsTable.$inferInsert

export const ProductSchema = createSelectSchema(productsTable, {})
export const ProductInsertSchema = createInsertSchema(productsTable, {
  cost: () => z.coerce.number().positive(),
  price: () => z.coerce.number().positive(),
  category: () => z.nativeEnum(PRODUCT_CATEGORIES),
})
export const ProductUpdateSchema = ProductSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
})

export type Product = z.infer<typeof ProductSchema>
export type ProductInsert = z.infer<typeof ProductInsertSchema>
export type ProductUpdate = Partial<z.infer<typeof ProductUpdateSchema>>
export type ProductIdType = Product['id']
