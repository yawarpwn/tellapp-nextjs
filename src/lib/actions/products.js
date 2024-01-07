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
	code: z.string().min(3, { message: 'Mínimo 3 caracteres' }).max(10, {
		message: 'Máximo  6 caracteres',
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
	try {
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

			// generic error db
			throw new Error('Error al insertar Proyecto')
		}

		revalidatePath('/products')
	} catch (error) {
		return {
			message: 'Error al ingresar producto',
			errors: true,
		}
	}
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

	try {
		const cookieStore = cookies()
		const supabase = createServerClient(cookieStore)
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

			// generic error db
			throw new Error('Error al insertar Proyecto')
		}

		revalidatePath('/products')
	} catch (error) {
		console.log('Error inserting Row', error)
		return {
			message: 'Error al Actualizar producto',
			errors: true,
		}
	}

	// revalidatePath('/products')
	// redirect('/products')
}

export async function deleteProduct(_, formData) {
	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)
	const id = formData.get('id')
	try {
		const { error } = await supabase.from(TABLE).delete().eq('id', id)
		revalidatePath('/products')
	} catch (error) {
		return {
			message: 'Error eliminando cliente',
		}
	}
}
