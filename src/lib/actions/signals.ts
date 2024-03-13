'use server'
import { TABLES } from '@/constants'
import { destroyResource, uploadImageFile } from '@/lib/cloudinary'
import { type SignalUpdate } from '@/schemas/signal'
import type { SignalCreate } from '@/types'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createClient } from '../supabase/server'

export async function updateSignal(formData: FormData) {
	const data = Object.fromEntries(formData.entries())

	const { title, code, category, id, fileImage, publicId } = data

	try {
		let dataToUpdate: SignalUpdate = {
			title: title as string,
			code: code as string,
			category: category as SignalUpdate['category'],
		}

		if (fileImage && publicId) {
			const {
				public_id,
				secure_url,
				width,
				height,
				format,
			} = await uploadImageFile(fileImage as File, {
				folder: 'signals',
			})
			console.log('upload image with public_id', public_id)

			await destroyResource(publicId as string)
			console.log('destroy image with public_id', publicId)

			dataToUpdate = {
				...dataToUpdate,
				url: secure_url,
				public_id,
				width,
				height,
				format,
			}
		}

		// update to Database
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { error } = await supabase.from(TABLES.Signals).update(dataToUpdate)
			.eq('id', id)

		if (error) throw error

		revalidatePath(`/signals/`)
	} catch (error) {
		console.log(error)
	}
}

export async function createSignal(formData: FormData) {
	const data = Object.fromEntries(formData.entries())

	const { title, code, category, fileImage } = data

	try {
		const {
			public_id,
			secure_url,
			width,
			height,
			format,
		} = await uploadImageFile(fileImage as File, {
			folder: 'signals',
		})
		console.log('upload image with public_id', public_id)

		// prepare data
		const dataTopInsert = {
			public_id,
			url: secure_url,
			width,
			height,
			format,
			category,
			title,
			code,
		}

		// update to Database
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { error } = await supabase.from(TABLES.Signals).insert(dataTopInsert)

		if (error) throw error

		revalidatePath(`/signals/`)
	} catch (error) {
		console.log(error)
	}
}

export async function deleteSignal(_: undefined, formData: FormData) {
	console.log(formData)
	const id = formData.get('id')

	const cookieStore = cookies()
	const supabase = createClient(cookieStore)

	const { error } = await supabase.from(TABLES.Signals).delete().eq('id', id)
	if (error) {
		console.log(error)
	}
	console.log('signal deleted')

	revalidatePath(`/signals/`)
}
