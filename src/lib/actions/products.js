'use server'

import { CATEGORIES } from '@/constants'
import { createServerClient } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import z from 'zod'
const categoriesArray = Object.values(CATEGORIES)

const TABLE = 'products'

const ProductSchema = z.object({
	id: z.string(),
	description: z.string().min(10, { message: 'Mínimo 10 caracteres' }),
	code: z.string().min(2, { message: 'Mínimo 3 caracteres' }).max(10, {
		message: 'Máximo 60 caracteres',
	}),
	price: z.coerce.number().gt(0, { message: 'Debe ser mayor a 0' }),
	cost: z.coerce.number().gt(0, { message: 'Debe ser mayor a 0' }),
	category: z.enum(categoriesArray),
	unit_size: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
})

// Create Product
const CreateProduct = ProductSchema.omit({ id: true })
export async function createProduct(_, formData) {
	// Obtenemos valores del formulario
	const rawData = {
		description: formData.get('description'),
		code: formData.get('code'),
		price: formData.get('price'),
		cost: formData.get('cost'),
		category: formData.get('category'),
		unit_size: formData.get('unit_size'),
	}

	// Validacion con Zod
	const validatedFields = CreateProduct.safeParse(rawData)

	// En caso de error
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Campos incorrectos',
		}
	}

	// Insert to Database
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	const { error } = await supabase.from(TABLE).insert(
		validatedFields.data,
	)

	// if exists error
	if (error) {
		// code must be unique
		if (error.code === '23505') {
			return {
				message: 'Error al ingresar el producto',
				errors: { code: ['Codigo ya existe'] },
			}
		}
	}

	revalidatePath('/products')
}

// Update Product
const UpdateProduct = ProductSchema
export async function updateProduct(_, formData) {
	const rawData = {
		id: formData.get('id'),
		description: formData.get('description'),
		code: formData.get('code'),
		price: formData.get('price'),
		cost: formData.get('cost'),
		category: formData.get('category'),
		unit_size: formData.get('unit_size'),
	}

	const validatedFields = UpdateProduct.safeParse(rawData)

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Campos incorrecto.',
		}
	}

	// create supabase client
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	// update data in database
	const { error } = await supabase.from(TABLE).update(
		validatedFields.data,
	).eq('id', validatedFields.data.id)

	// if exists error
	if (error) {
		// code must be unique
		if (error.code === '23505') {
			return {
				message: 'Error al ingresar el producto',
				errors: { code: ['Codigo ya existe'] },
			}
		}
	}

	revalidatePath('/products')
}

export async function deleteProduct(_, formData) {
	// create supabase client
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	const id = formData.get('id')

	// delete data in database
	const { error } = await supabase.from(TABLE).delete().eq('id', id)

	// handle error
	if (error) {
		return {
			message: 'Error eliminando cliente',
		}
	}

	revalidatePath('/products')

	return {
		message: 'Error eliminando cliente',
	}
}
