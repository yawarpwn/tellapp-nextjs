'use server'

import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'

const TABLE = 'labels'

const LabelSchema = z.object({
	id: z.string(),
	recipient: z.string(),
	destination: z.string(),
	dni_ruc: z.coerce.string(),
	address: z.string().nullable(),
	agency_id: z.string().nullable(),
	phone: z.coerce.string().length(9, {
		message: 'El telefono debe tener 9 caracteres',
	}).nullable(),
})

const CreateLabel = LabelSchema.omit({ id: true })
export async function createLabel(_, formData) {
	const rawData = {
		recipient: formData.get('recipient'),
		destination: formData.get('destination'),
		dni_ruc: formData.get('dni_ruc'),
		address: formData.get('address') || null,
		phone: formData.get('phone') || null,
		agency_id: formData.get('agency_id') || null,
	}

	const validatedFields = CreateLabel.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to Create Invoice.',
		}
	}

	try {
		const cookieStore = cookies()
		const supabase = createServerClient(cookieStore)
		const { error } = await supabase.from(TABLE).insert(validatedFields.data)
		if (error) throw new Error('Database Error: no se pudo crear el rotulo')
	} catch (error) {
		return {
			message: error.message,
			error: true,
		}
	}

	revalidatePath('/labels')
	redirect('/labels')
}

// Update Product
const UpdateLabel = LabelSchema
export async function updateLabel(_, formData) {
	const rawData = {
		id: formData.get('id'),
		recipient: formData.get('recipient'),
		destination: formData.get('destination'),
		dni_ruc: formData.get('dni_ruc'),
		address: formData.get('address') || null,
		phone: formData.get('phone') || null,
		agency_id: formData.get('agency_id') || null,
	}

	const validatedFields = UpdateLabel.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Missing Fields. Failed to UPdate Product.',
		}
	}

	console.log(validatedFields.data)

	try {
		const cookieStore = cookies()
		const supabase = createServerClient(cookieStore)
		const { error } = await supabase.from(TABLE).update(validatedFields.data)
			.eq('id', rawData.id)
		if (error) throw new Error('Database Error: Failed to update product')
	} catch (error) {
		return {
			message: error.message,
			error: true,
		}
	}

	revalidatePath('/labels')
	redirect('/labels')
}

export async function deleteLabel(_, formData) {
	const id = formData.get('id')
	try {
		const cookieStore = cookies()
		const supabase = createServerClient(cookieStore)
		const { error } = await supabase.from(TABLE).delete().eq('id', id)
		if (error) throw new Error('Database Error: Failed to delete product')
		revalidatePath('/labels')
	} catch (error) {
		return {
			message: error.message,
			error: true,
		}
	}
}
