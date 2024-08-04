import { agenciesTable } from '@/db/schemas'
import { z } from 'zod'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const AgencySchema = createSelectSchema(agenciesTable)
export const AgencyInsertSchema = createInsertSchema(agenciesTable, {
  ruc: () => z.coerce.string().length(11),
  phone: () => z.coerce.string().length(9).nullable().optional(),
})

export const AgencyUpdateSchema = AgencyInsertSchema.partial().omit({
  id: true,
  updatedAt: true,
  createdAt: true,
})

export type Agency = z.infer<typeof AgencySchema>
export type AgencyInsert = z.infer<typeof AgencyInsertSchema>
export type AgencyUpdate = Partial<z.infer<typeof AgencyInsertSchema>>
