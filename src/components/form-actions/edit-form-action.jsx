'use client'
import ConfirmActionModal from '@/components/confirm-action-modal'
import { EditIcon } from '@/icons'

function EditFormAction({ updateAction, children, titleModal = 'Editar' }) {
  return (
    <>
      <ConfirmActionModal
        action={updateAction}
        openButtonContent={<EditIcon />}
        title={titleModal}
      >
        {children}
      </ConfirmActionModal>
    </>
  )
}

export default EditFormAction
