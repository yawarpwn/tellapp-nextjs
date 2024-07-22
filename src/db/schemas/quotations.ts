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
import { customers } from './customers'

export const quotations = pgTable('_quotations', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  number: integer('number').notNull().unique(),
  deadline: integer('deadline').notNull(),
  credit: text('credit'),
  includeIgv: boolean('include_igv').default(false),
  customerId: uuid('customer_id').references(() => customers.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  items: jsonb('items').notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})

export type Quotation = typeof quotations.$inferSelect
