'use server'

import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

const TABLE = 'quotations'

const QuotationSchema = z.object({
	number: z.coerce.number(),
	id: z.string(),
	include_igv: z.coerce.boolean().default(true),
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
})

// Create Product
const CreateQuotation = QuotationSchema.omit({ id: true })
export async function createQuotation(_, formData) {
	const rawData = {
		number: formData.get('number'),
		ruc: formData.get('ruc') || null,
		company: formData.get('company') || 'SIN RUC PROPORCIONADO',
		address: formData.get('address'),
		deadline: formData.get('deadline'),
		include_igv: formData.get('igv'),
		items: JSON.parse(formData.get('items')),
	}

	// validated fields with zod
	const validatedFields = CreateQuotation.safeParse(rawData)

	// if error
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Invoice.',
		}
	}

	// create supabase client
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	const { error } = await supabase.from(TABLE).insert(validatedFields.data)

	// handle error
	if (error) {
		if (error?.code === '23505') {
			return {
				errors: {
					number: ['Ya existe es cotización '],
				},
			}
		}

		return {
			message: 'Database Error: Creando quotation',
		}
	}

	revalidatePath('/quotations')
	redirect('/quotations')
}

// Update Product
const UpdateQuotation = QuotationSchema
export async function updateQuotation(_, formData) {
	const rawData = {
		id: formData.get('id'),
		ruc: formData.get('ruc') || null,
		company: formData.get('company') || 'Sin Ruc Proporcionado',
		address: formData.get('address'),
		deadline: formData.get('deadline'),
		include_igv: formData.get('igv'),
		number: formData.get('number'),
		items: JSON.parse(formData.get('items')),
	}

	// validated fields
	const validatedFields = UpdateQuotation.safeParse(rawData)

	// if have error
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to UPdate Product.',
		}
	}

	const { number, id } = validatedFields.data

	// create supabase client
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	const { error } = await supabase.from(TABLE).update(validatedFields.data)
		.eq(
			'id',
			id,
		)

	// handle error
	if (error) {
		return {
			message: 'Error actualizando cotización',
			error: true,
		}
	}

	revalidatePath('/quotations')
	redirect(`/quotations/${number}`)
}

export async function deleteQuotation(_, formData) {
	const id = formData.get('id')

	// create supabase client
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	await supabase.from(TABLE).delete().eq('id', id)
	revalidatePath('/quotations')
}
