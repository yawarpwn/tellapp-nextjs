'use client'
import React, { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { createWatermarkAction } from '@/lib/actions/watermark'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { toast } from 'sonner'

function resizeImageFile(
  file: File,
  maxWidth: number,
  maxHeight: number,
  quality = 0.7,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      let { width, height } = img

      if (width > maxWidth || height > maxHeight) {
        const aspectRatio = width / height
        if (width > height) {
          width = maxWidth
          height = maxWidth / aspectRatio
        } else {
          height = maxHeight
          width = maxHeight * aspectRatio
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        blob => {
          if (blob) {
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(resizedFile)
          } else {
            reject(new Error('No se pudo crear el Blob de la imagen redimensionada'))
          }
        },
        file.type,
        quality,
      )

      URL.revokeObjectURL(url)
    }

    img.onerror = error => reject(error)
    img.src = url
  })
}

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
interface Props {
  onClose: () => void
}
export function Watermark({ onClose }: Props) {
  const [pending, startTransition] = useTransition()
  const [files, setFiles] = React.useState<File[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    for (const file of files) {
      const resizedFile = await resizeImageFile(file, 1000, 1000)
      console.log(resizedFile)
      formData.append('files[]', resizedFile)
    }

    startTransition(() => {
      toast.promise(createWatermarkAction(formData), {
        loading: 'Subiendo...',
        success: () => {
          onClose()
          return 'Subido correctamente'
        },
        error: 'Error subiendo',
      })
    })
  }

  return (
    <div className="mx-auto w-full max-w-3xl p-8">
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
          disabled={files.length === 0 || pending}
          variant="secondary"
          className="w-full bg-primary"
          type="submit"
        >
          {pending ? 'agregando logo...' : 'Agregar marca de agua'}
        </Button>
      </form>
    </div>
  )
}
