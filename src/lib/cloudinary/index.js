import { v2 as cloudinary } from 'cloudinary'
import toKebabCase from 'just-kebab-case'

cloudinary.config({
	cloud_name: 'tellsenales-cloud',
	api_key: '781191585666779',
	api_secret: 'Pti_on_Di9UByV40fS4gganpBO4',
	secure: true,
})

// cloudinary.uploader.upload('pepepe', {
//   tags:
// })

export async function uploadStream(buffer, { title, category }) {
	return new Promise((resolve, reject) => {
		const kebabTitle = toKebabCase(title)
		cloudinary.uploader.upload_stream({
			tags: [category],
			folder: 'gallery',
			public_id: kebabTitle,
			format: 'webp',
			overwrite: true,
			transformation: [{
				width: 'auto',
				height: 1000,
				crop: 'scale',
				quality: 'auto',
			}],
		}, (error, result) => {
			if (error) reject(error)
			resolve(result)
		})
			.end(buffer)
	})
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
