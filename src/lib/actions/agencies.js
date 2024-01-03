'use server'
import { createServerClient } from '@/lib/supabase'
import { deleteRow, insertRow, updateRow } from '@/services/supabase'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

const AgencieSchema = z.object({
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
})

// Create Product
const CreateAgency = AgencieSchema.omit({ id: true })
export async function createAgency(_, formData) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	const rawData = {
		company: formData.get('company'),
		ruc: formData.get('ruc'),
		address: formData.get('address') || null,
		phone: formData.get('phone') || null,
		destinations: formData.get('destinations'),
	}

	const validatedFields = CreateAgency.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Invoice.',
		}
	}

	try {
		await insertRow({
			table: 'agencies',
			row: {
				...validatedFields.data,
				destinations: validatedFields.data.destinations.split(','),
			},
			client: supabase,
		})
	} catch (error) {
		return {
			message: 'Database Error: Failed to create customer',
		}
	}

	revalidatePath('/agencies')
	redirect('/agencies')
}

// Update Product
const UpdateAgency = AgencieSchema
export async function updateAgency(_, formData) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	const rawData = {
		id: formData.get('id'),
		company: formData.get('company'),
		ruc: formData.get('ruc'),
		address: formData.get('address') || null,
		phone: formData.get('phone') || null,
		destinations: formData.get('destinations'),
	}

	const validatedFields = UpdateAgency.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error al completar campos requeridos.',
		}
	}

	try {
		await updateRow({
			table: 'agencies',
			row: {
				...validatedFields.data,
				destinations: validatedFields.data.destinations.split(','),
			},
			client: supabase,
		})
	} catch (error) {
		console.log('Error inserting Row', error)
		return {
			message: 'Database Error: Failed to update product',
		}
	}

	revalidatePath('/agencies')
	redirect('/agencies')
}

export async function deleteAgency(_, formData) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	const id = formData.get('id')
	try {
		await deleteRow({ table: 'agencies', client: supabase, id })
		revalidatePath('/agencies')
		return {
			message: 'Cliente eliminado',
		}
	} catch (error) {
		return {
			message: 'Error eliminando cliente',
		}
	}
}
