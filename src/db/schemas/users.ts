import { text, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('_users', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
