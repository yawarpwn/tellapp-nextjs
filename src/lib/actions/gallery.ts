'use server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { cloudinary, upload, uploadStream } from '../cloudinary'
import { createClient } from '../supabase/server'

export async function uploadFile(formData: FormData) {
	const imageFile = formData.get('imageFile') as File
	const category = formData.get('category') as string
	const title = formData.get('title') as string

	try {
		const arrayBuffer = await imageFile.arrayBuffer()
		const mime = imageFile.type
		const encoding = 'base64'
		const base64Data = Buffer.from(arrayBuffer).toString('base64')
		const fileUri = `data:${mime};${encoding},${base64Data}`

		const baseUrl = 'http://res.cloudinary.com/tellsenales-cloud/image/upload'

		// Insert image to cloudinary
		const {
			asset_id,
			height,
			width,
			format,
			secure_url,
			public_id,
			version,
			tags,
		} = await upload(fileUri, { category })
		console.log('image inserted on cloudinary')
		// prepared data  to insert in database
		const dataToInsert = {
			id: asset_id,
			title,
			category,
			height,
			width,
			format,
			public_id,
			url: secure_url,
			thumb_url: `${baseUrl}/w_100/${public_id}.webp`,
			medium_url: `${baseUrl}/w_400/${public_id}.webp`,
			version,
		}

		// insert data in database
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)

		const { data, error } = await supabase.from('gallery').insert(dataToInsert)
		if (error) {
			throw new Error('Error al insertar imagen a la base de datos')
		}

		revalidatePath('/gallery')

		return {
			success: true,
			message: 'Imagen agregada con exito',
		}
	} catch (error) {
		console.log('ERRor uploadsteram::::', error)
		return {
			success: false,
			message: 'Error al insertar imagen a la base de datos',
		}
	}
}

export async function deleteFile(_, formData) {
	const id = formData.get('id')
	const public_id = formData.get('public_id')

	try {
		// Delete in Cloudinary
		await cloudinary.uploader.destroy(public_id)

		// Delete in database
		const cookieStore = cookies()
		const supabase = createClient(cookieStore)
		const { data, error } = await supabase.from('gallery').delete().eq('id', id)

		if (error) {
			throw error
		}

		revalidatePath('/gallery')
	} catch (error) {
		console.log('errror deleting iamge', error)
	}
}

export async function uploadTest(formdata: FormData) {
	const files = formdata.get('files')
	console.log(files)
}
