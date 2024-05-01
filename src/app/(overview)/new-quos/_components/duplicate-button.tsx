'use client'

import React from 'react'
import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { DocumentDuplicateIcon } from '@/icons'
import { duplicateQuotationAction } from '@/lib/actions/quoatations'
import { Button, buttonVariants } from '@/components/ui/button'

export function DuplicateButton({ id }: { id: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <>

      <ConfirmActionDialog
        action={() => duplicateQuotationAction(id)}
        onSuccess={() => console.log('success')}
        dialogTitle='Duplicar Cotización'
        dialogDescription='¿Deseas duplicar esta cotización?'
        onOpenChange={setOpen}
        showTrigger={false}
        open={open}
      />
      <Button variant='secondary' onClick={() => setOpen(true)}>
        <DocumentDuplicateIcon size={20} />
      </Button>
    </>
  )

}
