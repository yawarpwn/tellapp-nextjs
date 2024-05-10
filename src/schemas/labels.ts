import { z } from 'zod'

export const labelSchema = z.object({
  id: z.string(),
  recipient: z.string(),
  destination: z.string(),
  dni_ruc: z.coerce.string(),
  address: z.string().nullable(),
  agency_id: z.string().nullable(),
  phone: z.coerce
    .string()
    .length(9, {
      message: 'El telefono debe tener 9 caracteres',
    })
    .nullable(),
  updated_at: z.string(),
  created_at: z.string(),
})

export const labelCreateSchema = labelSchema.omit({
  id: true,
  updated_at: true,
  created_at: true,
})
export const labelUpdateSchema = labelSchema.partial()
