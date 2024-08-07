import { text, pgTable, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'

export const customersTable = pgTable('_customers', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull().unique(),
  ruc: text('ruc').notNull().unique(),
  phone: text('phone'),
  address: text('address'),
  email: text('email').unique(),
  isRegular: boolean('is_regular').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
