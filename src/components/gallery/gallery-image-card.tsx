'use client'
import { type GalleryImage } from '@/types'
import { GalleryDeleteForm } from '../ui/gallery/galley-delete-form'
import { cn } from '@/lib/utils'
import { EditIcon, MoreVertical, TrashIcon } from 'lucide-react'

import { useState } from 'react'

interface Props {
  image: GalleryImage
}
export function GalleryImageCard({ image }: Props) {
  const { thumb, publicId } = image
  const [active, setActive] = useState(false)

  return (
    <div
      className="overflow-hidden rounded-md"
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="relative block h-[100px] w-[100px]">
        <div
          className={cn('absolute right-1 top-1 flex -translate-y-8 justify-evenly transition', {
            'translate-y-0': active,
          })}
        >
          <GalleryDeleteForm publicId={publicId} />
        </div>
        <img src={thumb} className="h-full w-full object-contain" />
      </div>
    </div>
  )
}
