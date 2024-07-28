import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { text, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('_users', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: text('text').$type<'admin'>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type User = typeof usersTable.$inferSelect
export type UserInsert = typeof usersTable.$inferInsert

export const UserSchema = createSelectSchema(usersTable)
export const UserInsertSchema = createInsertSchema(usersTable, {
  email: schema => schema.email.email(),
  password: schema => schema.password.min(6),
})
