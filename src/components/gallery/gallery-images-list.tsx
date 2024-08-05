import { type GalleryImage } from '@/types'
import { GalleryImageCard } from './gallery-image-card'

interface Props {
  images: GalleryImage[]
  title: string
}
export function GalleryImagesList({ images, title }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-1">
        {images.map(image => (
          <GalleryImageCard key={image.publicId} image={image} />
        ))}
      </ul>
    </div>
  )
}
