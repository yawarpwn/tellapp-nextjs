import { SIGNALS_CATEGORIES } from '@/constants'

import { z } from 'zod'

import { signalsTable } from '@/db/schemas'

import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const SignalSchema = createSelectSchema(signalsTable)
export const SignalInsertSchema = createInsertSchema(signalsTable, {
  category: z.nativeEnum(SIGNALS_CATEGORIES),
})
export const SignalUpdateSchema = SignalInsertSchema.partial().omit({
  id: true,
  updatedAt: true,
  createdAt: true,
})
export type Signal = z.infer<typeof SignalSchema> & {
  thumbUrl: string
}
export type SignalInsert = z.infer<typeof SignalInsertSchema>
export type SignalUpdate = Partial<z.infer<typeof SignalInsertSchema>>
