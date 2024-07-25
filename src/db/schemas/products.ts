import { text, pgTable, timestamp, uuid, integer } from 'drizzle-orm/pg-core'

export const productsTable = pgTable('_products', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  description: text('description').notNull(),
  code: text('code').notNull(),
  unitSize: text('unit_size').notNull(),
  link: text('link'),
  rank: integer('rank').default(0).notNull(),
  price: integer('price').notNull(),
  cost: integer('cost').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export type Product = typeof productsTable.$inferSelect
export type productInsert = typeof productsTable.$inferInsert
