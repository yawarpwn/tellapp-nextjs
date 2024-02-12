import {
	type ResourceApiResponse,
	type UploadApiOptions,
	v2 as cloudinary,
} from 'cloudinary'

import { type GalleryImage } from '@/types'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
})

function getThumbUrl(publicId: string) {
	const thumbsUrl = cloudinary.url(publicId, {
		width: 150,
		height: 150,
		crop: 'fill',
	})
	return thumbsUrl
}

export async function getResources(): Promise<ResourceApiResponse> {
	return cloudinary.api.resources({
		'type': 'upload',
		prefix: 'gallery',
		max_results: 100,
	})
}

export async function fetchGalleryImages() {
	const { resources } = await getResources()
	const galleryImagesMapped = resources.map(image => ({
		url: image.secure_url,
		publicId: image.public_id,
		thumb: getThumbUrl(image.public_id),
	}))

	return galleryImagesMapped
}

export async function deleteSource(publicId: string) {
	return cloudinary.uploader.destroy(publicId)
}

export async function uploadStream(
	buffer: Uint8Array | Buffer,
	{ category }: { category: string },
) {
	const options: UploadApiOptions = {
		tagstitle: [category],
		folder: 'gallery',
		format: 'webp',
		overwrite: true,
		allowed_formats: ['jpg', 'png', 'webp'],
		transformation: [{
			width: 'auto',
			height: 1000,
			crop: 'scale',
			quality: 'auto',
		}],
	}

	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload_stream(
			options,
			(error, result) => {
				if (error) {
					reject(error)
					return
				}
				resolve(result)
			},
		).end(buffer)
	})
}

export async function upload(
	file: File,
	{ category, folder }: { category: string; folder: string },
) {
	const mime = file.type
	const arrayBuffer = await file.arrayBuffer()
	const encoding = 'base64'
	const base64Data = Buffer.from(arrayBuffer).toString('base64')
	const fileUri = `data:${mime};${encoding},${base64Data}`

	const options = {
		tags: [category, folder],
		folder,
		format: 'webp',
		overwrite: true,
		allowed_formats: ['jpg', 'png', 'webp'],
		transformation: [{
			width: 'auto',
			height: 1000,
			crop: 'scale',
			quality: 'auto',
		}],
	}

	return cloudinary.uploader.upload(fileUri, options)
}

export {
	cloudinary,
}
