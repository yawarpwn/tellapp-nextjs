import { PRODUCT_CATEGORIES } from '@/constants'
import { z } from 'zod'

export const ProductSchema = z.object({
	id: z.string(),
	description: z.string().min(10, { message: 'Mínimo 10 caracteres' }),
	code: z.string().min(2, { message: 'Mínimo 3 caracteres' }).max(10, {
		message: 'Máximo 60 caracteres',
	}),
	price: z.coerce.number().gt(0, { message: 'Debe ser mayor a 0' }),
	cost: z.coerce.number().gt(0, { message: 'Debe ser mayor a 0' }),
	category: z.nativeEnum(PRODUCT_CATEGORIES),
	unit_size: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
})

export const ProductCreateSchema = ProductSchema.omit({ id: true })
export const ProductUpdateSchema = ProductSchema.partial()
