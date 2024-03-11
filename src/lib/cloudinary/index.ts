import {
	type ResourceApiResponse,
	type TransformationOptions,
	type UploadApiOptions,
	v2 as cloudinary,
} from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
})

function getThumbUrl(publicId: string) {
	const thumbsUrl = cloudinary.url(publicId, {
		width: 'auto',
		height: 150,
		crop: 'fill',
		format: 'webp',
	})
	return thumbsUrl
}

export async function getResources(): Promise<ResourceApiResponse> {
	return cloudinary.api.resources({
		'type': 'upload',
		prefix: 'gallery',
		max_results: 200,
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
	file: File,
	{ category, folder }: { category: string; folder: string },
) {
	const arrayBuffer = await file.arrayBuffer()
	const bytes = Buffer.from(arrayBuffer)
	const options: UploadApiOptions = {
		tags: [folder, category],
		folder: folder,
		overwrite: true,
		allowed_formats: ['jpg', 'png', 'webp'],
		transformation: [{
			width: 'auto',
			height: 1000,
			crop: 'scale',
			quality: 'auto',
			format: 'webp',
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
		).end(bytes)
	})
}

export async function uploadImageFile(
	file: File,
	options: UploadApiOptions,
) {
	const mime = file.type
	const arrayBuffer = await file.arrayBuffer()
	const encoding = 'base64'
	const base64Data = Buffer.from(arrayBuffer).toString('base64')
	const fileUri = `data:${mime};${encoding},${base64Data}`

	// const options: UploadApiOptions = {
	// 	tags: [category, folder],
	// 	folder,
	// 	overwrite: true,
	// 	allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
	// 	transformation: [
	// 		{
	// 			width: 'auto',
	// 			height: 1000,
	// 			crop: 'scale',
	// 			quality: 'auto',
	// 			format: 'webp',
	// 		},
	// 	],
	// }

	return cloudinary.uploader.upload(fileUri, options)
}

export async function destroyResource(publicId: string) {
	return cloudinary.uploader.destroy(publicId)
}

export {
	cloudinary,
}
