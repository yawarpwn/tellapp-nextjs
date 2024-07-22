type Item = {
  id: string
  price: number
  qty: number
  cost: number
  unit_size: string
  description: string
}

import {
  text,
  pgTable,
  serial,
  timestamp,
  uuid,
  boolean,
  integer,
  jsonb,
} from 'drizzle-orm/pg-core'
import { customersTable } from './customers'

export const quotationsTable = pgTable('_quotations', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  number: integer('number').notNull().unique(),
  deadline: integer('deadline').notNull(),
  credit: text('credit'),
  includeIgv: boolean('include_igv').default(false),
  customerId: uuid('customer_id').references(() => customersTable.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  items: jsonb('items').$type<Item[]>().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export type Quotation = typeof quotationsTable.$inferSelect
export type InsertQuotation = typeof quotationsTable.$inferInsert
