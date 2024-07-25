'use client'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { deleteQuotationAction } from '@/lib/actions/quoatations'
export function DeleteButton({ id }: { id: string }) {
  return (
    <ConfirmActionDialog
      action={() => deleteQuotationAction(id)}
      dialogTitle="Eliminar Cotización"
      dialogDescription="¿Deseas eliminar esta cotización?"
    />
  )
}
