'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { DownloadIcon } from '@/icons'
import { Share2Icon, ShareIcon } from 'lucide-react'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
export function Watermark() {
  const [blob, setBlob] = useState<Blob | null>(null)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = React.useState<File[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    formData.set('photo', files[0])

    setLoading(true)

    try {
      const res = await fetch('/api/watermark', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Error en la respuesta')

      const blob = await res.blob()
      setBlob(blob)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!blob) return

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'watermarked-image.jpg' // Nombre del archivo a descargar
    document.body.appendChild(link) // Necesario para Firefox
    link.click()
    document.body.removeChild(link) // Limpiar el DOM
    URL.revokeObjectURL(url) // Liberar memoria
  }

  const handleShare = async () => {
    if (!blob) return

    if (!navigator.share) {
      console.log('share api no supported')
      return
    }

    const url = URL.createObjectURL(blob)

    try {
      await navigator.share({
        title: 'Imagen con Marca de Agua',
        text: 'Mira esta imagen con marca de agua.',
        files: [new File([blob], 'watermarked-image.jpg', { type: 'image/jpeg' })],
      })
      console.log('Compartido exitosamente')
    } catch (error) {
      console.error('Error al compartir:', error)
    } finally {
      URL.revokeObjectURL(url) // Liberar memoria
    }
  }

  return (
    <div className="grid gap-8">
      <form onSubmit={handleSubmit}>
        {/* {imageSrc ? ( */}
        {/*   <div> */}
        {/*     <img src={imageSrc} /> */}
        {/*   </div> */}
        {/* ) : ( */}
        {/*   <input required name="photo" className="block" type="file" /> */}
        {/* )} */}

        <FilePond
          files={files}
          required
          onupdatefiles={itemsFiles => {
            setFiles(itemsFiles.map(itemFile => itemFile.file as File))
          }}
          allowMultiple={false}
          acceptedFileTypes={['jpeg', 'png', 'jpg', 'webp', 'avif']}
          maxFiles={1}
          // server="/api"
          name="photo"
          labelIdle='Arrastra y suelta tu foto <span class="filepond--label-action">Subir</span>'
        />
        <Button
          disabled={files.length === 0}
          variant="secondary"
          className="w-full bg-primary"
          type="submit"
        >
          {loading ? 'agregando logo...' : 'Agregar marca de agua'}
        </Button>
      </form>

      {blob && (
        <div className="flex h-[288px] items-center justify-center overflow-hidden rounded-sm bg-foreground">
          <div className="relative h-[256px] w-[340px] overflow-hidden rounded-md">
            <img className="h-full w-full object-cover" src={URL.createObjectURL(blob)} />
            <div className="absolute right-0 top-0 z-10 flex flex-col gap-2 p-2 ">
              <Button
                className="h-8 w-8 rounded-full"
                variant="outline"
                size={'icon'}
                onClick={handleDownload}
              >
                <DownloadIcon size={20} />
              </Button>
              <Button
                className="h-8 w-8 rounded-full"
                variant="outline"
                size={'icon'}
                onClick={handleShare}
              >
                <Share2Icon size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
