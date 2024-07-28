import { customersTable } from '@/db/schemas'
import { z } from 'zod'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

// Customers
export const CustomerSchema = createSelectSchema(customersTable)
export const CustomerInsertSchema = createInsertSchema(customersTable, {
  ruc: () => z.coerce.string().length(11),
  address: schema => schema.address.nullable().optional(),
  email: schema => schema.email.email().nullable().optional(),
  phone: () => z.coerce.string().length(9).nullable().optional(),
})
export const CustomerUpdateSchema = CustomerInsertSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  isRegular: true,
})

export type Customer = z.infer<typeof CustomerSchema>
export type CustomerInsert = z.infer<typeof CustomerInsertSchema>
export type CustomerUpdate = Partial<z.infer<typeof CustomerInsertSchema>>
