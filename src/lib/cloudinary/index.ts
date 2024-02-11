import { type UploadApiOptions, v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
})

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

export async function upload(file: string, { category }: { category: string }) {
	const options = {
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

	return cloudinary.uploader.upload(file, options)
}

export async function getResources() {
	const { resources } = await cloudinary.api.resources({
		'type': 'upload',
		prefix: 'gallery',
		max_results: 100,
	})

	return resources
}

export {
	cloudinary,
}
