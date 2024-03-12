'use server'
import { TABLES } from '@/constants'
import { destroyResource, uploadImageFile } from '@/lib/cloudinary'
import { type SignalUpdate } from '@/schemas/signal'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { createClient } from '../supabase/server'

export async function updateSignal(signal: SignalUpdate, formData: FormData) {
	const data = Object.fromEntries(formData.entries())

	const { name, code, category, id, fileImage, publicId } = data

	try {
		let dataToUpdate: SignalUpdate = {
			name: name as string,
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
