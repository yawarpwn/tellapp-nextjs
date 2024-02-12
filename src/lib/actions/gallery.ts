'use server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { cloudinary, deleteSource, upload } from '../cloudinary'
import { createClient } from '../supabase/server'

export async function uploadFiles(
	formData: FormData,
): Promise<{ success: boolean; message: string }> {
	const imagesFiles = formData.getAll('files') as unknown as File[]
	const category = formData.get('category') as string
	const folder = formData.get('folder') as string

	const promises = imagesFiles.map(async file => {
		return upload(file, { category, folder })
	})

	try {
		await Promise.all(promises)
		revalidatePath('/gallery')
		return {
			success: true,
			message: 'Imagen agregada con exito',
		}
	} catch (error) {
		console.log('error subiendo imagenes files', error)
		return {
			success: false,
			message: 'Error al insertar imagen a la base de datos',
		}
	}
}

export async function deleteImageGallery(formData: FormData) {
	const public_id = formData.get('publicId') as string

	try {
		// Delete in Cloudinary
		await deleteSource(public_id)
		revalidatePath('/gallery')
	} catch (error) {
		console.log('errror deleting iamge', error)
	}
}

export async function uploadTest(formdata: FormData) {
	const files = formdata.get('files')
	console.log(files)
}