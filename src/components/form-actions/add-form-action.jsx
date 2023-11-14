'use client'
import ConfirmActionModal from '@/ui/components/confirm-action-modal'
import { PlusIcon } from '@/icons'
import { useState } from 'react'

function AddFormAction({ addAction, children, titleModal = 'Agregar' }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const closeModal = () => setIsOpenModal(false)

  return (
    <>
      <ConfirmActionModal
        title={titleModal}
        isOpen={isOpenModal}
        openButtonContent={
          <>
            <PlusIcon />
            Agregar
          </>
        }
        message="Agregar Agencia"
        onClose={closeModal}
        action={addAction}
      >
        {children}
      </ConfirmActionModal>
    </>
  )
}

export default AddFormAction
