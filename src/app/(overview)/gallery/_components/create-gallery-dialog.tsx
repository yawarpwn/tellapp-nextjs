'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AddButton } from '@/components/buttons'
import { GALLERY_CATEGORIES } from '@/constants'
import * as React from 'react'
import { createGalleryAction } from '@/lib/actions/gallery'
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Sub } from '@radix-ui/react-dropdown-menu'

export function CreateGalleryDialog() {
  const [open, setOpen] = React.useState(false)
  const [isCreatePending, setIsCreatePending] = React.useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AddButton />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar foto a galeria</DialogTitle>
        </DialogHeader>
        <form action={createGalleryAction} className="flex flex-col gap-4">
          <input required type="file" name="photo" />
          <div className="grid gap-2">
            <Label>Titulo</Label>
            <Input name="title" type="text" placeholder="Fibra de vidrio 60x60cm vista posterior" />
          </div>
          <div className="grid gap-2">
            <Label>Categoria</Label>
            <Select name="category" required>
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
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
