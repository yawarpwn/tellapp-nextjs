import { z } from 'zod'

export const QuotationSchema = z.object({
	number: z.coerce.number(),
	id: z.string(),
	include_igv: z.coerce.boolean(),
	is_regular_customer: z.coerce.boolean(),
	ruc: z
		.string()
		.length(11, {
			message: 'Ruc debe tener 11 caracteres',
		})
		.nullable(),
	company: z.string().default('SIN RUC PROPORCIONADO'),
	address: z.string(),
	deadline: z.coerce.number().gt(0, {
		message: 'Debe ser mayor a 0',
	}),
	items: z
		.array(
			z.object({
				id: z.string(),
				price: z.number(),
				qty: z.number(),
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

export const CreateQuotation = QuotationSchema.omit({ id: true })
export const UpdateQuotation = QuotationSchema.partial()

export type Quotation = z.infer<typeof QuotationSchema>
export type QuotationUpdate = z.infer<typeof UpdateQuotation>
export type QuotationItem = z.infer<typeof QuotationSchema>['items'][0]
