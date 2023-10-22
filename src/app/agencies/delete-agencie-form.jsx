'use client'
import { deleteAgencieForm } from './actions'
import { useState } from 'react'
import { DeleteIcon } from '@/icons'
import ConfirmActionModal from '@/components/confirm-action-modal'

function DeleteAgencieForm({ id }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const closeConfirmModal = () => setIsConfirmModalOpen(false)
  const openConfirmModal = () => setIsConfirmModalOpen(true)
  return (
    <>
      <form action={deleteAgencieForm}>
        <input name="id" defaultValue={id} className="sr-only" />
        <button
          type="button"
          onClick={openConfirmModal}
          className="btn btn-error"
        >
          <DeleteIcon />
        </button>

        {isConfirmModalOpen && (
          <ConfirmActionModal
            isOpen={isConfirmModalOpen}
            onClose={closeConfirmModal}
            message="¿Seguro deseas eliminar esta agencia?"
          />
        )}
      </form>
    </>
  )
}

export default DeleteAgencieForm
