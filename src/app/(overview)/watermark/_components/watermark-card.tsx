import { DownloadIcon, XIcon } from '@/icons'
import { Button } from '@/components/ui/button'
import { Share2Icon, ShareIcon } from 'lucide-react'

export function WatermarkCard({ url }: { url: string }) {
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

  return (
    <div className="relative flex w-[340px] flex-col gap-2 overflow-hidden rounded-md">
      {/* Buttons */}
      <div className="absolute right-0 flex flex-col justify-center gap-2 p-2 ">
        <Button
          className="h-8 w-8 rounded-full"
          variant="outline"
          size={'icon'}
          onClick={handleDownload}
        >
          <DownloadIcon size={20} />
        </Button>
        <Button
          onClick={handleShare}
          className="h-8 w-8 rounded-full"
          variant="outline"
          size={'icon'}
        >
          <Share2Icon size={20} />
        </Button>
      </div>
      <div className="overflow-hidden rounded-md">
        <img className="h-full w-full object-contain" src={url} />
      </div>
    </div>
  )
}
