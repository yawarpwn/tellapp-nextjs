'use client'
import ConfirmActionModal from '@/components/confirm-action-modal'
import Modal from '@/components/modal'
import { PlusIcon } from '@/icons'
import { useState } from 'react'
// import { experimental_useFormState as useFormState } from 'react-dom'

function AddAgencieForm({ addAction, children, titleModal }) {
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

export default AddAgencieForm
