'use server'

// import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@/lib/supabase'
import { deleteRow, insertRow, updateRow } from '@/services/supabase'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

const QuotationSchema = z.object({
	number: z.coerce.number(),
	id: z.string(),
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
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	const rawData = {
		number: formData.get('number'),
		ruc: formData.get('ruc') || null,
		company: formData.get('company') || 'SIN RUC PROPORCIONADO',
		address: formData.get('address'),
		deadline: formData.get('deadline'),
		items: JSON.parse(formData.get('items')),
	}

	console.log('rawData: ', rawData)

	const validatedFields = CreateQuotation.safeParse(rawData)

	console.log('validate Fields', validatedFields.data)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Invoice.',
		}
	}

	try {
		await insertRow({
			table: 'quotations',
			row: validatedFields.data,
			client: supabase,
		})
	} catch (error) {
		console.log('Error inserting Row', error)
		return {
			message: 'Database Error: Failed to create customer',
		}
	}

	revalidatePath('/quotations')
	redirect('/quotations')
}

// Update Product
const UpdateQuotation = QuotationSchema.omit({ number: true })
export async function updateQuotation(_, formData) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	const quoNumber = formData.get('number')
	const rawData = {
		id: formData.get('id'),
		ruc: formData.get('ruc') || null,
		company: formData.get('company') || 'Sin Ruc Proporcionado',
		address: formData.get('address'),
		deadline: formData.get('deadline'),
		items: JSON.parse(formData.get('items')),
	}

	console.log('update Raw: ', rawData)

	const validatedFields = UpdateQuotation.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to UPdate Product.',
		}
	}

	try {
		await updateRow({
			table: 'quotations',
			row: validatedFields.data,
			client: supabase,
		})
	} catch (error) {
		console.log('Error inserting Row', error)
		return {
			message: 'Database Error: Failed to update product',
		}
	}

	revalidatePath('/quotations')
	redirect(`/quotations/${quoNumber}`)
}

export async function deleteQuotation(_, formData) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	const id = formData.get('id')
	try {
		await deleteRow({ table: 'quotations', client: supabase, id })
		revalidatePath('/quotations')
		return {
			message: 'Cliente eliminado',
		}
	} catch (error) {
		return {
			message: 'Error eliminando cliente',
		}
	}
}
