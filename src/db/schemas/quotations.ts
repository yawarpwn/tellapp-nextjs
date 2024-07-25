import type { QuotationItemType } from '@/types'

import {
  pgTable,
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
  credit: integer('credit'),
  includeIgv: boolean('include_igv').default(false).notNull(),
  customerId: uuid('customer_id').references(() => customersTable.id),
  items: jsonb('items').$type<QuotationItemType[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export type Quotation = typeof quotationsTable.$inferSelect
export type InsertQuotation = typeof quotationsTable.$inferInsert
