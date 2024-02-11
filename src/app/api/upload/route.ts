import { cloudinary } from '@/lib/cloudinary'
import { NextRequest, NextResponse } from 'next/server'

console.log(cloudinary.config().cloud_name)
async function upload(fileUri: string) {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(fileUri, {
			invalidate: true,
		})
			.then(result => resolve(result))
			.catch(error => reject(error))
	})
}

async function uploadStream(buffer: Uint8Array) {
	return new Promise((resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					invalidate: true,
				},
				function(error, result) {
					if (error) {
						reject(error)
						return
					}
					resolve(result)
				},
			)
			.end(buffer)
	})
}
export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const imageFile = formData.get('imageFile') as File

		const arrayBuffer = await imageFile.arrayBuffer()
		const buffer = new Uint8Array(arrayBuffer)
		const mime = imageFile.type
		// const encoding = 'base64'
		const base64Data = Buffer.from(arrayBuffer).toString('base64')
		const fileUrl = `data:${mime};base64,${base64Data}`

		// const results = await upload(fileUrl)
		const results = await uploadStream(buffer)

		const { secure_url } = results
		return NextResponse.json({ data: secure_url })
	} catch (error) {
		console.error('este es el error:::::', error)
		return NextResponse.json(
			{
				message: 'An error occurred while processing the request.',
			},
			{ status: 500 },
		)
	}
}
