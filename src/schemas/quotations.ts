import { z } from 'zod'
import { quotationsTable } from '@/db/schemas'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const QuotationItemSchema = z.object({
  id: z.string(),
  price: z.number(),
  qty: z.number(),
  cost: z.number().optional().nullable(),
  unit_size: z.string(),
  description: z.string(),
})

export const QuotationClientSchema = z.object({
  number: z.number(),
  id: z.string(),
  includeIgv: z.coerce.boolean(),
  isRegularCustomer: z.coerce.boolean().default(false).optional().nullable(),
  customerId: z.string().optional().nullable(),
  ruc: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  deadline: z.coerce.number().gt(0, {
    message: 'Debe ser mayor a 0',
  }),
  items: z.array(QuotationItemSchema),
  credit: z.coerce.number().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const QuotationClientCreateSchema = QuotationClientSchema.omit({
  id: true,
  number: true,
  items: true,
  updatedAt: true,
  createdAt: true,
})

export const QuotationClientUpdateSchema = QuotationClientSchema.omit({
  id: true,
  createdAt: true,
  items: true,
  number: true,
}).partial()

export const QuotationSchema = createSelectSchema(quotationsTable)
export const QuotationInsertSchema = createInsertSchema(quotationsTable)

export type Quotation = z.infer<typeof QuotationSchema>
export type QuotationInsert = typeof quotationsTable.$inferInsert
export type QuotationItem = z.infer<typeof QuotationItemSchema>

export type QuotationClient = z.infer<typeof QuotationClientSchema>
export type QuotationClientCreate = z.infer<typeof QuotationClientCreateSchema>
export type QuotationClientUpdate = z.infer<typeof QuotationClientUpdateSchema>
