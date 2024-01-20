'use server'
import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import z from 'zod'

const TABLE = 'agencies'

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
	const rawData = {
		company: formData.get('company'),
		ruc: formData.get('ruc'),
		address: formData.get('address') || null,
		phone: formData.get('phone') || null,
		destinations: formData.get('destinations'),
	}

	// validated fields
	const validatedFields = CreateAgency.safeParse(rawData)

	// if error
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Invoice.',
		}
	}

	// prepare data to insert
	const agencieToInsert = {
		...validatedFields.data,
		destinations: validatedFields.data.destinations.split(','),
	}

	// create supabase client
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	// insert data to db
	const { error } = await supabase.from(TABLE).insert(agencieToInsert)

	// handle error
	if (error) {
		return {
			message: 'Database Error: no se pudo crear la agencia',
		}
	}

	revalidatePath('/agencies')
}

// Update Product
const UpdateAgency = AgencieSchema
export async function updateAgency(_, formData) {
	const rawData = {
		id: formData.get('id'),
		company: formData.get('company'),
		ruc: formData.get('ruc'),
		address: formData.get('address') || null,
		phone: formData.get('phone') || null,
		destinations: formData.get('destinations'),
	}

	// validated fields
	const validatedFields = UpdateAgency.safeParse(rawData)

	// if error
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error al completar campos requeridos.',
		}
	}

	// create supabase client
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	// prepare data to update
	const agencieToUpdate = {
		...validatedFields.data,
		destinations: validatedFields.data.destinations.split(','),
	}

	// update data in db
	const { error } = await supabase.from(TABLE).update(agencieToUpdate)

	// handle error
	if (error) {
		return {
			message: 'Error actualizando agencia',
		}
	}

	revalidatePath('/agencies')
}

export async function deleteAgency(_, formData) {
	const id = formData.get('id')

	// create supabase client
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	await supabase.from(TABLE).delete().eq('id', id)

	revalidatePath('/agencies')
}
