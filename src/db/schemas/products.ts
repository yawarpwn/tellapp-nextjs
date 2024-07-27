import {
  text,
  pgTable,
  timestamp,
  uuid,
  integer,
  real,
} from 'drizzle-orm/pg-core'

export const productsTable = pgTable('_products', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  description: text('description').notNull(),
  code: text('code').notNull(),
  unitSize: text('unit_size').notNull(),
  link: text('link'),
  rank: real('rank').default(0).notNull(),
  price: real('price').notNull(), //must be 1, 2,  0.5, 5.5
  cost: integer('cost').notNull(), //must be 1, 2, 0.5. 55
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Product = typeof productsTable.$inferSelect
export type ProductInsert = typeof productsTable.$inferInsert
