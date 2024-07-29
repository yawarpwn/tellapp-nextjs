import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { usersTable } from '@/db/schemas'

export type User = typeof usersTable.$inferSelect
export type UserInsert = typeof usersTable.$inferInsert

export const UserSchema = createSelectSchema(usersTable)
export const UserInsertSchema = createInsertSchema(usersTable, {
  email: schema => schema.email.email(),
  password: schema => schema.password.min(6),
}).pick({ email: true, password: true })
