'use server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { uploadStream } from '../cloudinary'

export async function uploadFile(formData) {
	const entries = Object.fromEntries(formData)

	const { title, category, imageFile } = entries
	const arrayBuffer = await imageFile.arrayBuffer()
	const uit8Array = new Uint8Array(arrayBuffer)

	console.log({ title, category, imageFile })

	try {
		const result = await uploadStream(uit8Array, { title, category })
		console.log(result)
		revalidatePath('/gallery')
	} catch (error) {
		console.log(error)
	}
}
