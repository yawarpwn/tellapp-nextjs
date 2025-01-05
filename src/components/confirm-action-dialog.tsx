'use client'

import { Button } from '@/components/ui/button'
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
import { DeleteIcon } from '@/icons'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
  showTrigger?: boolean
  action: () => Promise<void>
  dialogDescription?: string | React.ReactNode
  dialogTitle?: string | React.ReactNode
}
export function ConfirmActionDialog({
  showTrigger = true,
  dialogTitle = 'Esta abssolutamente seguro?',
  dialogDescription = 'Esta accion no se puede deshacer, posteriormente no se podra recuperar',
  onOpenChange,
  open,
  action,
}: Props) {
  const [pending, startTranstion] = React.useTransition()

  const handleClick = () => {
    startTranstion(async () => {
      await action()
    })
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button>
            <DeleteIcon />
            <span className="ml-2 max-md:sr-only">eliminar</span>
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {DialogDescription && (
            <DialogDescription className="py-4">{dialogDescription}</DialogDescription>
          )}
          <DialogFooter className="gap-y-2">
            <DialogClose asChild>
              <Button>Cancelar</Button>
            </DialogClose>
            <Button variant={'primary'} disabled={pending} onClick={handleClick}>
              {pending && <Loader2 className="mr-2 animate-spin" />}
              Aceptar
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
