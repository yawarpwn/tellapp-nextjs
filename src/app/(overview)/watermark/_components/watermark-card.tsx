'use client'
import { DownloadIcon, XIcon } from '@/icons'
import { Button } from '@/components/ui/button'
import { Share2Icon, ShareIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function WatermarkCard({
  url,
  thumbUrl,
  id,
}: {
  url: string
  thumbUrl: string
  id: string
}) {
  const [deleting, setDeleting] = useState(false)

  const handleDownload = () => {
    const anchor = document.createElement('a')
    anchor.href = url
    const hash = new Date().getTime().toString()
    anchor.download = `tellsenales-photo-${hash}`
    anchor.click()
  }
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Imagen para compartir',
          text: 'Mira esta imagen interesante!',
          url: url,
        })
        console.log('Imagen compartida exitosamente')
      } catch (error) {
        console.error('Error al compartir la imagen:', error)
      }
    } else {
      alert('La funcionalidad de compartir no está disponible en este dispositivo.')
    }
  }

  const deleteAction = async () => {
    setDeleting(true)
    toast.promise(
      fetch('/api/watermark', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
        .then(res => {
          if (!res.ok) throw new Error('Error al eliminar foto')
          setDeleting(false)
          console.log('success')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setDeleting(false)
        }),
      {
        loading: 'Eliminando',
        success: 'Eliminado',
        error: 'Error',
      },
    )
  }

  return (
    <div className="absolute overflow-hidden rounded-md">
      {/* Buttons */}
      <div className="absolute right-0 flex flex-col justify-center gap-2 p-1 ">
        <Button
          className="h-6 w-6 rounded-full"
          variant="outline"
          size={'icon'}
          onClick={handleDownload}
        >
          <DownloadIcon size={16} />
        </Button>
        <Button
          onClick={handleShare}
          className="h-6 w-6 rounded-full"
          variant="outline"
          size={'icon'}
        >
          <Share2Icon size={16} />
        </Button>
        <Button
          onClick={deleteAction}
          className="h-6 w-6 rounded-full"
          variant="outline"
          size={'icon'}
          disabled={deleting}
        >
          <XIcon size={16} />
        </Button>
      </div>
      <div className="overflow-hidden rounded-md">
        <img className="h-full w-full object-contain" src={thumbUrl} />
      </div>
    </div>
  )
}
