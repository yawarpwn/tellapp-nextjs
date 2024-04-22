import { z } from 'zod'
export const QuotationSchema = z.object({
	number: z.number(),
	id: z.string(),
	include_igv: z.coerce.boolean(),
	is_regular_customer: z.coerce.boolean(),
	ruc: z.optional(z.string()),
	company: z.string().optional(),
	address: z.string().optional(),
	deadline: z.coerce.number().gt(0, {
		message: 'Debe ser mayor a 0',
	}),
	items: z
		.array(
			z.object({
				id: z.string(),
				price: z.number(),
				qty: z.number(),
				cost: z.number(),
				unit_size: z.string(),
				description: z.string(),
			}),
		)
		.nonempty({
			message: 'Debe tener al menos un Producto',
		}),
	created_at: z.string(),
	updated_at: z.string(),
})

export const QuotationItemsSchema = QuotationSchema.pick({ items: true })

export const QuotationCreateSchema = QuotationSchema.omit({
	id: true,
	number: true,
	updated_at: true,
	items: true,
	created_at: true,
})
export const QuotationUpdateSchema = QuotationSchema.partial()
