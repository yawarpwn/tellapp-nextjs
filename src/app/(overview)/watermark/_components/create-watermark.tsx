'use client'
import { Button } from '@/components/ui/button'
import { Watermark } from './watermark'
import { useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export function CreateWatermark() {
  const [open, setOpen] = useState(false)

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
          {/* <DialogHeader> */}
          {/*   <DialogTitle>Crear Foto con marca de agua</DialogTitle> */}
          {/* </DialogHeader> */}
          <Watermark onClose={closeModal} />
        </DialogContent>
      </Dialog>
    </>
  )
}
