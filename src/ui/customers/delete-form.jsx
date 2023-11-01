'use client'
import ConfirmModalAction from '../confirm-action-modal'
import { DeleteIcon } from '@/icons'
import { useState } from 'react'
import { useFormState } from 'react-dom'
import { deleteCustomer } from '@/lib/actions/customers'

const initialState = {
  message: null,
  errors: {},
}

function DeleteForm({ id }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const openModal = () => setIsOpenModal(true)
  const closeModal = () => setIsOpenModal(false)
  const [state, dispatch] = useFormState(deleteCustomer, initialState)
  return (
    <>
      <ConfirmModalAction
        action={dispatch}
        isOpen={isOpenModal}
        onClose={closeModal}
      >
        <input name="id" value={id} type="hidden" className="sr-only" />
      </ConfirmModalAction>
      <button onClick={openModal} className="btn btn-sm">
        <DeleteIcon />
      </button>
    </>
  )
}

export default DeleteForm
