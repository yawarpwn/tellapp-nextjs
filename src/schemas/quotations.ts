import { z } from 'zod'
import { quotationsTable } from '@/db/schemas'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const QuotationItemSchema = z.object({
  id: z.string(),
  price: z.number(),
  qty: z.number(),
  cost: z.number().optional().nullable(),
  unitSize: z.string(),
  description: z.string(),
})

export const QuotationSchema = createSelectSchema(quotationsTable)
export const QuotationInsertSchema = createInsertSchema(quotationsTable)

export type Quotation = z.infer<typeof QuotationSchema>
export type QuotationInsert = typeof quotationsTable.$inferInsert
export type QuotationItem = z.infer<typeof QuotationItemSchema>

//
// export const QuotationSchema = z.object({
//   number: z.number(),
//   id: z.string(),
//   include_igv: z.coerce.boolean(),
//   is_regular_customer: z.coerce.boolean().default(false).optional().nullable(),
//   customerId: z.string().optional().nullable(),
//   ruc: z.string().optional().nullable(),
//   company: z.string().optional().nullable(),
//   address: z.string().optional().nullable(),
//   deadline: z.coerce.number().gt(0, {
//     message: 'Debe ser mayor a 0',
//   }),
//   credit: z.coerce.number().optional().nullable(),
//   items: z.array(QuotationItemSchema),
//   created_at: z.date(),
//   updated_at: z.date(),
// })
//
// export const QuotationCreateSchema = QuotationSchema.omit({
//   id: true,
//   number: true,
//   updated_at: true,
//   items: true,
//   created_at: true,
// })
// export const QuotationUpdateSchema = QuotationSchema.partial().omit({
//   items: true,
// })
