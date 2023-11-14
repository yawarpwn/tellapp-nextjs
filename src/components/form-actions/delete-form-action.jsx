'use client'
import { DeleteIcon } from '@/icons'
import ConfirmActionModal from '@/ui/components/confirm-action-modal'

function DeleteFormAction({
  id,
  titleModal = '¿Seguro deseas eliminar?',
  deleteAction
}) {
  return (
    <>
      <ConfirmActionModal
        title={titleModal}
        action={deleteAction}
        maxWidthModal="xs"
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

export default DeleteFormAction
