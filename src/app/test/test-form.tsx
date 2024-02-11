// import { cloudinary } from '@/lib/cloudinary'
// async function updateFile(formData) {
// 	'use server'
//
// 	const file = formData.get('file')
// 	const arrayBuffer = await file.arrayBuffer()
// 	const buffer = new Uint8Array(arrayBuffer)
//
// 	console.log('cloud-name', cloudinary.config().cloud_name)
//
// 	try {
// 		const result = await new Promise((resolve, reject) => {
// 			cloudinary.uploader.upload_stream({}, (error, result) => {
// 				if (error) reject(error)
// 				resolve(result)
// 			}).end(buffer)
// 		})
// 		console.log(result)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }
'use client'
import React from 'react'

const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
	event.preventDefault()
	const formData = new FormData(event.currentTarget)
	try {
		const res = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
		})

		if (!res.ok) throw new Error('Error en la peticion')
		const data = await res.json()
		console.log(data)
	} catch (error) {
		console.log('error', error)
	}
}
export function TestForm() {
	return (
		<form onSubmit={handlesubmit}>
			<input required type='file' name='imageFile' />
			<button type='submit'>enviar</button>
		</form>
	)
}
