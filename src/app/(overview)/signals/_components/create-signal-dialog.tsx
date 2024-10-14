'use client'

import { FilePond, registerPlugin } from 'react-filepond'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// Styles filepond
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { AddButton } from '@/components/buttons'
import { SIGNALS_CATEGORIES } from '@/constants'
import * as React from 'react'
import { createSignalAction } from '@/lib/actions/signals'
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

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export function CreateSignalDialog() {
  const [open, setOpen] = React.useState(false)
  const [pending, startTransition] = React.useTransition()

  const [files, setFiles] = React.useState<File[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set('photo', files[0])

    startTransition(() => {
      toast.promise(createSignalAction(formData), {
        loading: 'Subiendo...',
        success: () => {
          form.reset()
          setFiles([])
          setOpen(false)
          return 'Galeria creada'
        },
        error: 'Error al subir foto a la galeria',
      })
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AddButton />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear senal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <div className="grid gap-2">
            <Label>Titulo</Label>
            <Input name="title" type="text" placeholder="Fibra de vidrio 60x60cm vista posterior" />
          </div>
          <div className="grid gap-2">
            <Label>Código</Label>
            <Input name="code" type="text" placeholder="Código de identificacion" />
          </div>
          <div className="grid gap-2">
            <Label>Descripcion</Label>
            <Textarea name="description" placeholder="Descripcion de la senal" />
          </div>
          <div className="grid gap-2">
            <Label>Categoria</Label>
            <Select name="category" required>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Seleciona una categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(SIGNALS_CATEGORIES).map(item => (
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
              {pending ? 'Subiendo' : 'Subir'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
