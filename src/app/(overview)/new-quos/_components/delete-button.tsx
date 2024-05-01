'use client'

import { deleteQuotationAction } from "@/lib/actions/quoatations";
import { ConfirmActionDialog } from "@/components/confirm-action-dialog";
export function DeleteButton({ id }: { id: string }) {
  return (
    <ConfirmActionDialog
      onSuccess={() => console.log('success')}
      action={() => deleteQuotationAction(id)}
      dialogTitle='Eliminar Cotización'
      dialogDescription='¿Deseas eliminar esta cotización?'
    />
  )
}
