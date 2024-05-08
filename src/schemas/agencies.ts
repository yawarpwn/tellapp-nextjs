import { z } from 'zod'

export const agency = z.object({
  id: z.string(),
  company: z.string(),
  ruc: z.coerce.number().positive().min(10000000000, {
    message: 'Ruc debe ser de 11 digitos',
  }),
  address: z.string().nullable(),
  phone: z.coerce.number().nullable(),
  destinations: z.string().refine(
    data => {
      if (!data) return false
      const items = data.split(',').map(item => item.trim())
      return items.length > 0
    },
    {
      message: 'Uno o mas destinos, separados por coma',
    },
  ),
  updated_at: z.string(),
  created_at: z.string(),
})

export const agencyCreateSchema = agency.omit({
  id: true,
  updated_at: true,
  created_at: true,
  destinations: true,
})
export const agencyUpdateSchema = agency.partial()
