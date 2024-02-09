import { v2 as cloudinary } from 'cloudinary'
import toKebabCase from 'just-kebab-case'

cloudinary.config({
	cloud_name: 'tellsenales-cloud',
	api_key: '781191585666779',
	api_secret: 'Pti_on_Di9UByV40fS4gganpBO4',
	secure: true,
})

export async function uploadStream(buffer, { title, category }) {
	return new Promise((resolve, reject) => {
		const kebabTitle = toKebabCase(title)
		cloudinary.uploader.upload_stream({
			folder: 'gallery' + '/' + category,
			public_id: kebabTitle,
		}, (error, result) => {
			if (error) reject(error)
			resolve(result)
		})
			.end(buffer)
	})
}

export {
	cloudinary,
}
