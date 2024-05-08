import { z } from 'zod'

export const customerSchema = z.object({
  id: z.string(),
  name: z.string().min(10, {
    message: 'El nombre debe tener al menos 10 caracteres',
  }),
  ruc: z.coerce.string().length(11, {
    message: 'El ruc debe tener al menos 11 caracteres',
  }),
  address: z
    .string()
    .min(10, {
      message: 'La dirección debe tener al menos 10 caracteres',
    })
    .nullable(),
  phone: z.coerce
    .string()
    .length(9, {
      message: 'El telefono debe tener 9 caracteres',
    })
    .nullable(),
  email: z
    .string()
    .email({
      message: 'El correo no es valido',
    })
    .nullable(),
  created_at: z.date(),
  updated_at: z.date(),
})

export const customerCreateSchema = customerSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  email: true,
  phone: true,
})
export const customerUpdateSchema = customerSchema.partial()
