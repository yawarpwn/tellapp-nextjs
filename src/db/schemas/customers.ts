import { text, pgTable, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'

export const customersTable = pgTable('_customers', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull().unique(),
  ruc: text('ruc').notNull().unique(),
  address: text('address'),
  isRegular: boolean('is_regular').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Customer = typeof customersTable.$inferSelect
export type CustomerInsert = typeof customersTable.$inferInsert
