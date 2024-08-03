import { SIGNALS_CATEGORIES } from '@/constants'

import { z } from 'zod'

export const SignalSchema = z.object({
  title: z.string(),
  id: z.string(),
  code: z.string(),
  category: z.nativeEnum(SIGNALS_CATEGORIES),
  url: z.string(),
  public_id: z.string(),
  width: z.number(),
  height: z.number(),
  format: z.string(),
  updated_at: z.string(),
  created_at: z.string(),
})

export const SignalUpdateSchema = SignalSchema.partial()
export const SignalDeleteSchema = SignalSchema.pick({ id: true })
export const SignalCreateSchema = SignalSchema.omit({
  id: true,
  updated_at: true,
  created_at: true,
})

export type Signal = z.infer<typeof SignalSchema>
export type SignalUpdate = z.infer<typeof SignalUpdateSchema>
export type SignalCreate = z.infer<typeof SignalCreateSchema>
