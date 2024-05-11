import { z } from 'zod'
import { agencySchema } from './agencies'
export const labelSchema = z.object({
  id: z.string(),
  recipient: z.string(),
  destination: z.string(),
  dni_ruc: z
    .string({
      required_error: 'El Dni/Ruc es requerido',
    })
    .refine(
      value => {
        // Comprobar si el valor es un número y tiene 8 o 11 dígitos
        return /^\d{8}$|^\d{11}$/.test(value)
      },
      {
        message: 'El DNI/RUC debe ser un string de 8 o 11 dígitos',
      },
    ),
  address: z.string().nullish(),
  agency_id: z.string().nullable().optional(),
  phone: z.coerce
    .string()
    .length(9, {
      message: 'El telefono debe tener 9 caracteres',
    })
    .nullish(),
  agencies: agencySchema.nullable(),
  updated_at: z.string(),
  created_at: z.string(),
})

export const labelCreateSchema = labelSchema.omit({
  id: true,
  updated_at: true,
  created_at: true,
  agencies: true,
})
export const labelUpdateSchema = labelSchema.partial()
