'use client'

import { deleteQuotationAction } from '@/lib/actions/quoatations'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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

export function DeleteButton({
  id,
  showTrigger = false,
}: {
  id: string
  showTrigger: boolean
}) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [pending, startTranstion] = React.useTransition()
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {showTrigger && (
          <DialogTrigger asChild>
            <Button variant={'secondary'} size={'sm'}>
              <DeleteIcon size={20} />
              <span className="ml-2 max-md:sr-only">Eliminar</span>
            </Button>
          </DialogTrigger>
        )}

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Duplicar Cotización</DialogTitle>
            {DialogDescription && (
              <DialogDescription className="py-4">
                ¿Deseas duplicar esta cotización?
              </DialogDescription>
            )}
            <DialogFooter className="gap-y-2">
              <DialogClose asChild>
                <Button>Cancelar</Button>
              </DialogClose>
              <Button
                variant={'primary'}
                disabled={pending}
                onClick={() => {
                  startTranstion(async () => {
                    toast.promise(deleteQuotationAction(id), {
                      success: () => {
                        router.push(`/new-quos/`)
                        return `Cotizacion Eliminado correctamente`
                      },
                      loading: 'eliminado...',
                      error: 'No se pudo eliminar',
                    })
                  })
                }}
              >
                {pending && <Loader2 className="mr-2 animate-spin" />}
                Aceptar
              </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
