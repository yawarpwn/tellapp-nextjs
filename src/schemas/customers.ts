import { customersTable } from '@/db/schemas'
import { z } from 'zod'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

// Customers
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

export const customerSchema = z.object({
  id: z.string(),
  name: z.string().min(10, {
    message: 'El nombre debe tener al menos 10 caracteres',
  }),
  ruc: z.coerce.string().length(11, {
    message: 'El ruc debe tener al menos 11 caracteres',
  }),
  address: z
    .string()
    .min(10, {
      message: 'La dirección debe tener al menos 10 caracteres',
    })
    .nullable(),
  phone: z.coerce
    .string()
    .length(9, {
      message: 'El telefono debe tener 9 caracteres',
    })
    .nullable(),
  email: z
    .string()
    .email({
      message: 'El correo no es valido',
    })
    .nullable(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const customerCreateSchema = customerSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  email: true,
  phone: true,
})
export const customerUpdateSchema = customerSchema.partial()
