import { PRODUCT_CATEGORIES } from '@/constants'
import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.number(),
  description: z
    .string({
      required_error: 'Descripción es requerida',
    })
    .min(10, { message: 'Mínimo 10 caracteres' }),
  code: z
    .string({ required_error: 'Cóigo es requerido' })
    .min(2, { message: 'Mínimo 3 caracteres' })
    .max(15, {
      message: 'Máximo 15 caracteres',
    }),
  price: z.coerce
    .number({
      invalid_type_error: 'Debe ser un número valido',
    })
    .gt(0, { message: 'Debe ser mayor a 0' }),
  cost: z.coerce
    .number({
      invalid_type_error: 'Debe ser un número valido',
    })
    .gt(0, { message: 'Debe ser mayor a 0' }),
  category: z.nativeEnum(PRODUCT_CATEGORIES, {
    required_error: 'La categoria es requerida',
  }),
  unit_size: z
    .string({
      required_error: 'unidad / medida es requerida',
    })
    .min(2, { message: 'Mínimo 3 caracteres' }),
  rank: z.coerce.number().gt(0, { message: 'Debe ser mayor a 0' }).optional(),
})

export const ProductCreateSchema = ProductSchema.omit({ id: true })
export const ProductUpdateSchema = ProductSchema.partial()
