'use server'
import { TABLES } from '@/constants'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import {
	destroyResource,
	uploadImageFile,
} from '../cloudinary'
import { createServerClient } from '../supabase/server'

// export async function uploadFiles(
// 	formData: FormData,
// ): Promise<{ success: boolean; message: string }> {
// 	const imagesFiles = formData.getAll('files') as unknown as File[]
// 	const category = formData.get('category') as string
// 	const folder = formData.get('folder') as string
//
// 	const promises = imagesFiles.map(async file => {
// 		// return uploadStream(file, { category, folder })
// 		uploadImageFile(file, { category, folder })
// 	})
//
// 	try {
// 		await Promise.all(promises)
// 		revalidatePath('/gallery')
// 		return {
// 			success: true,
// 			message: 'Imagen agregada con exito',
// 		}
// 	} catch (error) {
// 		console.log('error subiendo imagenes files', error)
// 		return {
// 			success: false,
// 			message: 'Error al insertar imagen a la base de datos',
// 		}
// 	}
// }
//
// export async function deleteImageGallery(formData: FormData) {
// 	const public_id = formData.get('publicId') as string
//
// 	try {
// 		// Delete in Cloudinary
// 		await deleteSource(public_id)
// 		revalidatePath('/gallery')
// 	} catch (error) {
// 		console.log('errror deleting iamge', error)
// 	}
// }

export async function createGalleryImage(formData: FormData) {
	const data = Object.fromEntries(formData.entries())

	const { title, category, fileImage } = data

	try {
		const {
			public_id,
			secure_url,
			width,
			height,
			format,
		} = await uploadImageFile(fileImage as File, {
			folder: 'gallery',
			allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
			transformation: [{
				width: 'auto',
				height: 1000,
				crop: 'scale',
				quality: 'auto',
				format: 'webp',
			}],
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
		}

		// update to Database
		const cookieStore = cookies()
		const supabase = createServerClient(cookieStore)
		const { error } = await supabase.from(TABLES.Gallery).insert(dataTopInsert)

		if (error) throw error

		revalidatePath(`/gallery/`)
	} catch (error) {
		console.log(error)
	}
}

export async function updateGalleryImage(formData: FormData) {
	const data = Object.fromEntries(formData.entries())

	const { title, category, id, fileImage, publicId } = data
	console.log('----', data)

	try {
		let dataToUpdate = {
			title,
			category,
			updated_at: new Date().toISOString(),
		}

		if (fileImage && publicId) {
			const {
				public_id,
				secure_url,
				width,
				height,
				format,
			} = await uploadImageFile(fileImage as File, {
				folder: 'gallery',
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
		const supabase = createServerClient(cookieStore)
		const { error } = await supabase.from(TABLES.Gallery).update(dataToUpdate)
			.eq('id', id)

		if (error) throw error

		revalidatePath(`/gallery/`)
	} catch (error) {
		console.log(error)
	}
}

export async function deleteGalleryImage(_: undefined, formData: FormData) {
	const id = formData.get('id') as string
	const publicId = formData.get('publicId') as string

	const cookieStore = cookies()
	const supabase = createServerClient(cookieStore)

	// destroy image in cloudinary
	await destroyResource(publicId)
	console.log('destroy image with public_id', publicId)

	const { error } = await supabase.from(TABLES.Gallery).delete().eq('id', id)
	if (error) {
		console.log(error)
	}
	console.log('gallery image deleted')

	revalidatePath(`/gallery/`)
}
