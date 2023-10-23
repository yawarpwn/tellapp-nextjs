'use client'
import { deleteAgencieForm } from './actions'
import { DeleteIcon } from '@/icons'
import ConfirmActionModal from '@/components/confirm-action-modal'

function DeleteAgencieForm({ id }) {
  return (
    <>
      <ConfirmActionModal
        message="¿Seguro deseas eliminar esta agencia?"
        action={deleteAgencieForm}
        maxWidthModal='xs'
        openButtonContent={
          <>
            <DeleteIcon />
          </>
        }
        openButtonVariant="error"
      >
        <input name="id" defaultValue={id} className="sr-only" />
      </ConfirmActionModal>
    </>
  )
}

export default DeleteAgencieForm
