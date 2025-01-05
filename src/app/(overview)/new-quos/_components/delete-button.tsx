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

interface Props {
  id: string
  showTrigger: boolean
  quotationNumber: number
}
export function DeleteButton({ id, quotationNumber, showTrigger = false }: Props) {
  // const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [pending, startTranstion] = React.useTransition()
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {showTrigger && (
          <DialogTrigger asChild>
            <Button variant={'secondary'} size={'sm'}>
              <DeleteIcon size={20} />
              <span className="ml-2 hidden lg:block">Eliminar</span>
            </Button>
          </DialogTrigger>
        )}

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Cotización</DialogTitle>
            {DialogDescription && (
              <DialogDescription className="py-4">
                ¿Eliminar Cotización <strong>#{quotationNumber}</strong> ?
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
                        // router.push(`/new-quos/`)
                        return `Cotizacion ${quotationNumber} Eliminado`
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
