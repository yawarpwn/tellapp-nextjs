'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { DocumentDuplicateIcon } from '@/icons'
import { duplicateQuotationAction } from '@/lib/actions/quoatations'

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
import { Loader2 } from 'lucide-react'

interface Props {
  id: string
  showTrigger: boolean
  quotationNumber: number
}
export function DuplicateButton({ id, showTrigger = false, quotationNumber }: Props) {
  const [open, setOpen] = React.useState(false)
  const [pending, startTranstion] = React.useTransition()
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        {showTrigger && (
          <DialogTrigger asChild>
            <Button size={'sm'}>
              <DocumentDuplicateIcon size={20} />
              <span className="ml-2 hidden lg:block">Duplicar</span>
            </Button>
          </DialogTrigger>
        )}

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Duplicar Cotización <strong>{quotationNumber}</strong>
            </DialogTitle>
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
                    duplicateQuotationAction(id)
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
