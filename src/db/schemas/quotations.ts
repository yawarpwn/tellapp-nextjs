import type { QuotationItem } from '@/types'

import { pgTable, timestamp, uuid, boolean, integer, real, jsonb } from 'drizzle-orm/pg-core'
import { customersTable } from './customers'

export const quotationsTable = pgTable('_quotations', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  number: integer('number').notNull().unique(),
  deadline: integer('deadline').notNull(),
  credit: integer('credit'),
  includeIgv: boolean('include_igv').default(false).notNull(),
  customerId: uuid('customer_id').references(() => customersTable.id),
  isPaymentPending: boolean('is_payment_pending').default(false).notNull(),
  items: jsonb('items').$type<QuotationItem[]>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Quotation = typeof quotationsTable.$inferSelect
export type InsertQuotation = typeof quotationsTable.$inferInsert
