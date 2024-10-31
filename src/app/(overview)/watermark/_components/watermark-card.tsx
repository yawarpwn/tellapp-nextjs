'use client'
import { DownloadIcon, XIcon } from '@/icons'
import { Button } from '@/components/ui/button'
import { Share2Icon, ShareIcon } from 'lucide-react'
import { useState } from 'react'
import { deleteWatermarkAction } from '@/lib/actions/watermark'
import { toast } from 'sonner'
import { useTransition } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import TrashIcon from '@/icons/delete-icon'

interface Props {
  url: string
  thumbUrl: string
  id: string
  width: number
  height: number
}
export function WatermarkCard({ url, thumbUrl, id, width, height }: Props) {
  const [pending, startTransition] = useTransition()
  const [openModal, setOpenModal] = useState(false)

  const handleDownload = async () => {
    const blob = await fetch(url).then(res => res.blob())
    const blobUrl = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = blobUrl
    const hash = new Date().getTime().toString()
    anchor.download = `tellsenales-photo-${hash}`
    anchor.target = '_blank'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }
  const handleShare = async () => {
    if (navigator.share) {
      const blob = await fetch(url).then(res => res.blob())
      try {
        await navigator.share({
          title: 'Imagen para compartir',
          text: 'Mira esta imagen interesante!',
          files: [
            new File([blob], 'Tellsenales-foto.jpg', {
              type: blob.type,
            }),
          ],
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
    startTransition(() => {
      toast.promise(deleteWatermarkAction({ id }), {
        loading: 'Eliminando...',
        success: () => {
          return 'Eliminado'
        },
        error: 'Error eliminando',
      })
    })
  }

  return (
    <>
      {openModal && (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="relative overflow-hidden rounded-md p-0">
            <div className="">
              <img src={url} className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center gap-2 p-2">
              <div className="flex gap-4 rounded-md bg-background px-6 py-2">
                <Button className="h-8 w-8" size={'icon'} onClick={handleDownload}>
                  <DownloadIcon size={20} />
                </Button>
                <Button onClick={handleShare} className="h-8 w-8 " size={'icon'}>
                  <Share2Icon size={20} />
                </Button>
                <Button
                  onClick={deleteAction}
                  className="h-8 w-8 "
                  variant="destructive"
                  size={'icon'}
                  disabled={pending}
                >
                  <TrashIcon size={20} />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <div
        className="relative max-w-full cursor-pointer overflow-hidden rounded-md"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {/* Buttons */}
        <div className="">
          <img className="h-full w-full object-contain" src={thumbUrl} />
        </div>
        <div
          onClick={() => setOpenModal(true)}
          className="absolute inset-0  bg-black/80 opacity-0 transition-colors duration-100 hover:opacity-100"
        ></div>
      </div>
    </>
  )
}
