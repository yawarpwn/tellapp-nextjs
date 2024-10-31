'use client'
import { Button } from '@/components/ui/button'
import { Watermark } from './watermark'
import React, { useState, useTransition } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { createWatermarkAction } from '@/lib/actions/watermark'
import { resizeImageFile } from '@/lib/utils'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { toast } from 'sonner'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export function CreateWatermark({ onLayout }: { onLayout?: () => void }) {
  const [open, setOpen] = useState(false)

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
        success: result => {
          const { data, error } = result
          if (error) {
            throw error
          }
          if (onLayout) {
            onLayout()
          }
          closeModal()
          return 'Subido correctamente'
        },
        error: err => {
          console.log(err)
          return 'Error eliminando'
        },
      })
    })
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">Crear</Button>
        </DialogTrigger>
        <DialogContent className="max-h-[95dvh] overflow-y-auto">
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
        </DialogContent>
      </Dialog>
    </>
  )
}
