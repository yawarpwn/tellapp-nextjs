import { fetchFilteredGallery } from '@/lib/data/gallery'
import { TrashIcon } from 'lucide-react'
import { NoResultRow } from '../components/no-result-row'
import {
	GalleryDeleteFormButton,
	GalleryEditFormButton,
} from './gallery-buttons'

export async function GalleryTable({ query, currentPage }: {
	query: string
	currentPage: number
}) {
	const galleryImages = await fetchFilteredGallery(query, currentPage)
	const hasGalleryImages = galleryImages && galleryImages.length > 0
	return (
		<div className='overflow-x-auto'>
			<table className='table table-sm'>
				<thead>
					<tr>
						<th></th>
						<th>Nombre</th>
						<th>Categoria</th>
						<th>Ancho</th>
						<th>Alto</th>
						<th>Formato</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{hasGalleryImages
						? galleryImages.map((photo) => (
							<tr key={photo.id}>
								<td>
									<div className='w-12 h-12 '>
										<img
											alt={photo.title}
											className='w-full h-full object-contain'
											src={`https://res.cloudinary.com/tellsenales-cloud/image/upload/c_scale,w_40/${photo.public_id}.${photo.format}`}
										/>
									</div>
								</td>
								<td>
									<div className='min-w-[250px]'>
										{photo.title}
									</div>
								</td>
								<td>{photo.category}</td>
								<td>{photo.width}</td>
								<td>{photo.height}</td>
								<td>{photo.format}</td>
								<td>
									<div className='flex gap-2 items-center'>
										<GalleryEditFormButton galleryImage={photo} />
										<GalleryDeleteFormButton
											id={photo.id}
											publicId={photo.public_id}
										/>
									</div>
								</td>
							</tr>
						))
						: <NoResultRow query={query} colSpan={7} />}
				</tbody>
			</table>
		</div>
	)
}
