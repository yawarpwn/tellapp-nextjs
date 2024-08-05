import { labelsTable } from '@/db/schemas'
import { z } from 'zod'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const LabelBaseSchema = createSelectSchema(labelsTable)

export const LabelInsertSchema = createInsertSchema(labelsTable, {
  observations: schema => schema.observations.nullable().optional(),
  agencyId: schema => schema.agencyId.nullable().optional(),
  address: schema => schema.address.nullable().optional(),
  dniRuc: schema => schema.dniRuc.length(8).or(schema.dniRuc.length(11)),
  recipient: schema => schema.recipient.min(1),
  destination: schema => schema.destination.min(1),
})
export const LabelUpdateSchema = LabelInsertSchema.partial().omit({
  id: true,
  updatedAt: true,
  createdAt: true,
})

export type Label = z.infer<typeof LabelBaseSchema> & {
  agency?: {
    name: string
    address: string
    phone?: string | null
    ruc: string
  } | null
}
export type LabelInsert = z.infer<typeof LabelInsertSchema>
export type LabelUpdate = Partial<z.infer<typeof LabelInsertSchema>>
