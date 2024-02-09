import { cloudinary } from '@/lib/cloudinary'
import { UploadFilesForm } from '@/ui/gallery/upload-files-form'

export default async function Page() {
	const { resources } = await cloudinary.api.resources({
		'type': 'upload',
		prefix: 'gallery',
		max_results: 100,
	})

	return (
		<div>
			<UploadFilesForm />
			<ul className='grid grid-cols-4 '>
				{resources.map((resource) => (
					<div key={resource.public_id} className='w-[72px] h-[72px]'>
						<img src={resource.secure_url} />
					</div>
				))}
			</ul>
		</div>
	)
}
