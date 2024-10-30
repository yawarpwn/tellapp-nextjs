import { z } from 'zod'

import { watermarksTable } from '@/db/schemas'

import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

export const WatermarkSchema = createSelectSchema(watermarksTable)
export const WatermarkInsertSchema = createInsertSchema(watermarksTable, {})
export const WatermarkUpdateSchema = WatermarkInsertSchema.partial().omit({
  id: true,
  updatedAt: true,
  createdAt: true,
})
export type Watermark = z.infer<typeof WatermarkSchema> & {
  thumbUrl: string
}
export type WatermarkInsert = z.infer<typeof WatermarkInsertSchema>
export type WatermarkUpdate = Partial<z.infer<typeof WatermarkInsertSchema>>
