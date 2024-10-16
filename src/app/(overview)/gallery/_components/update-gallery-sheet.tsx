'use client'

import { FilePond, registerPlugin } from 'react-filepond'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// Styles filepond
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AddButton } from '@/components/buttons'
import { GALLERY_CATEGORIES } from '@/constants'
import * as React from 'react'
import { updateGalleryAction } from '@/lib/actions/gallery'
import { SubmitButton } from '@/components/submit-button'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Gallery } from '@/schemas'
import { XIcon } from '@/icons'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

// interface UpdateTaskSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
//   product: Product
// }

interface Props {
  open: boolean
  closeDialog: () => void
  gallery: Gallery
}
export function UpdateGalleryDialog({ open, closeDialog, gallery }: Props) {
  // const [open, setOpen] = React.useState(false)
  const [pending, startTransition] = React.useTransition()
  const [imgSrc, setImgSrc] = React.useState(gallery.url)

  const [files, setFiles] = React.useState<File[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    if (files[0]) {
      formData.set('photo', files[0])
    }

    startTransition(() => {
      toast.promise(updateGalleryAction(formData), {
        loading: 'Actualizando...',
        success: () => {
          form.reset()
          setFiles([])
          closeDialog()
          return 'Galeria Actualizada'
        },
        error: 'Error al actualizar foto a la galeria',
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <AddButton />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar foto a galeria</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {imgSrc ? (
            <div className="relative flex justify-center overflow-hidden rounded-md bg-foreground p-2">
              <div className="w-[300px] overflow-hidden rounded-md">
                <img src={imgSrc} className="h-full w-full object-cover" />
              </div>
              <button
                onClick={() => {
                  setImgSrc('')
                }}
                className="absolute right-2 top-2 flex size-[30px] items-center justify-center rounded-full bg-background text-foreground"
              >
                <XIcon size={20} />
              </button>
            </div>
          ) : (
            <FilePond
              files={files}
              onupdatefiles={itemsFiles => {
                setFiles(itemsFiles.map(itemFile => itemFile.file as File))
              }}
              allowMultiple={false}
              acceptedFileTypes={['jpeg', 'png', 'jpg', 'webp', 'avif']}
              maxFiles={1}
              // server="/api"
              name="photo"
              labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
          )}
          <div className="grid gap-2">
            <Label>Titulo</Label>
            <Input
              name="title"
              type="text"
              placeholder="Fibra de vidrio 60x60cm vista posterior"
              defaultValue={gallery.title}
            />
          </div>
          <input type="hidden" name="public-id" value={gallery.publicId} />
          <input type="hidden" name="id" value={gallery.id} />
          <div className="grid gap-2">
            <Label>Categoria</Label>
            <Select name="category" defaultValue={gallery.category} required>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Seleciona una categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(GALLERY_CATEGORIES).map(item => (
                    <SelectItem key={item} value={item} className="capitalize">
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="gap-2 pt-2 sm:space-x-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" disabled={pending}>
              {pending ? 'Actualizando...' : 'Actualizar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
