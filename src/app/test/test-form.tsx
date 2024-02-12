import { cloudinary } from '@/lib/cloudinary'
import React from 'react'

async function uploadImageFile(file: File) {
	const arrayBuffer = await file.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	return new Promise(async (resolve, reject) => {
		await cloudinary.uploader.upload_stream(
			{ folder: 'demo', resource_type: 'auto' },
			async (error, result) => {
				if (error) {
					return reject(error)
				}

				return resolve(result)
			},
		).end(buffer)
	})
}

export function TestForm() {
	async function uploadImage(formData: FormData) {
		'use server'
		const imageFile = formData.get('imageFile') as File
		try {
			const result = await uploadImageFile(imageFile)
			console.log(result)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<form action={uploadImage}>
			<input required type='file' name='imageFile' />
			<button type='submit'>enviar</button>
		</form>
	)
}
