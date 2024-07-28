import { text, pgTable, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const customersTable = pgTable('_customers', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull().unique(),
  ruc: text('ruc').notNull().unique(),
  phone: text('phone'),
  address: text('address'),
  email: text('email'),
  isRegular: boolean('is_regular').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// export type Customer = typeof customersTable.$inferSelect
// export type CustomerInsert = typeof customersTable.$inferInsert

export const CustomerSchema = createSelectSchema(customersTable, {
  address: schema => schema.address.nullable().optional(),
  email: schema => schema.email.email(),
})
export const CustomerInsertSchema = createInsertSchema(customersTable)
export const CustomerUpdateSchema = CustomerSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
})

export type Customer = z.infer<typeof CustomerSchema>
export type CustomerInsert = z.infer<typeof CustomerInsertSchema>
export type CustomerUpdate = Partial<z.infer<typeof CustomerUpdateSchema>>

// export const customerSchema = z.object({
//   id: z.string(),
//   name: z.string().min(10, {
//     message: 'El nombre debe tener al menos 10 caracteres',
//   }),
//   ruc: z.coerce.string().length(11, {
//     message: 'El ruc debe tener al menos 11 caracteres',
//   }),
//   address: z
//     .string()
//     .min(10, {
//       message: 'La dirección debe tener al menos 10 caracteres',
//     })
//     .nullable(),
//   phone: z.coerce
//     .string()
//     .length(9, {
//       message: 'El telefono debe tener 9 caracteres',
//     })
//     .nullable(),
//   email: z
//     .string()
//     .email({
//       message: 'El correo no es valido',
//     })
//     .nullable(),
//   created_at: z.date(),
//   updated_at: z.date(),
// })
//
// export const customerCreateSchema = customerSchema.omit({
//   id: true,
//   created_at: true,
//   updated_at: true,
//   email: true,
//   phone: true,
// })
// export const customerUpdateSchema = customerSchema.partial()
