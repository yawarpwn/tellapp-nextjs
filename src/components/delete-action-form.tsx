'use client'
import ConfirmModalAction from '@/components/confirm-action-modal'
import { DeleteIcon } from '@/icons'
import { useState, useActionState } from 'react';

const initialState = {
  message: null,
  errors: {},
}

interface Props {
  id: string
  publicId?: string
  deleteAction: (_: undefined, formData: FormData) => Promise<void>
}

function DeleteActionForm({ id, publicId, deleteAction }: Props) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const openModal = () => setIsOpenModal(true)
  const closeModal = () => setIsOpenModal(false)
  const [state, dispatch] = useActionState(deleteAction, initialState)
  return (
    <>
      <ConfirmModalAction onAction={dispatch} isOpen={isOpenModal} onClose={closeModal}>
        <input name="id" value={id} type="hidden" className="sr-only" />
        {publicId && <input name="publicId" value={publicId} type="hidden" className="sr-only" />}
      </ConfirmModalAction>
      <button className="btn btn-sm" onClick={openModal}>
        <DeleteIcon size={20} />
      </button>
    </>
  )
}

export default DeleteActionForm
