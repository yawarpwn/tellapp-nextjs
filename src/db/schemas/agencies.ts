import { text, pgTable, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'

export const agenciesTable = pgTable('_agencies', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull().unique(),
  ruc: text('ruc').notNull().unique(),
  phone: text('phone'),
  address: text('address').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
