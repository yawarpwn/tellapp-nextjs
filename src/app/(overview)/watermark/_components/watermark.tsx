'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { Upload } from 'lucide-react'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { WatermarkCard } from './watermark-card'

type Response = {
  url: string
}

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
export function Watermark() {
  const [photos, setPhotos] = useState<Response[]>([])
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = React.useState<File[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    for (const file of files) {
      formData.append('files[]', file)
    }

    setLoading(true)

    try {
      const res = await fetch('/api/watermark', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const messageError = `${res.status} : ${res.statusText}`
        console.log(messageError)
        throw new Error('Error en la respuesta' + messageError)
      }

      const json = (await res.json()) as Response[]
      setPhotos(json)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-8">
      {photos.length > 0 && (
        <div className="mb-8 flex justify-center">
          <Button
            onClick={() => {
              setPhotos([])
              setFiles([])
            }}
            variant="secondary"
            className="flex items-center gap-4"
          >
            <Upload />
            Subir otras fotos
          </Button>
        </div>
      )}
      <div className="grid gap-8">
        {photos.length > 0 ? (
          <div className="flex flex-col gap-4">
            {photos.map(photo => (
              <WatermarkCard key={photo.url} url={photo.url} />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <FilePond
              files={files}
              required
              onupdatefiles={itemsFiles => {
                setFiles(itemsFiles.map(itemFile => itemFile.file as File))
              }}
              allowMultiple
              acceptedFileTypes={['jpeg', 'png', 'jpg', 'webp', 'avif']}
              maxFiles={5}
              // server="/api"
              name="photos"
              labelIdle='Arrastra y suelta tu foto <span class="filepond--label-action">Subir</span>'
            />
            <Button
              disabled={files.length === 0 || loading}
              variant="secondary"
              className="w-full bg-primary"
              type="submit"
            >
              {loading ? 'agregando logo...' : 'Agregar marca de agua'}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
