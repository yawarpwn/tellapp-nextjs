'use client'
import Input from '@/components/input'
import Modal from '@/components/modal'
import { createAgencie } from './actions'
import { useEffect, useState, useTransition } from 'react'
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

function SubmitButton() {
  const status = useFormStatus()

  return (
    <button type="submit" className="btn btn-primary">
      {status.pending ? 'creando...' : 'Crear Agencia'}
    </button>
  )
}

const initialState = {
  message: null,
  success: false
}

function AddAgencieForm() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const handleCloseModal = () => setIsOpenModal(false)
  const  handleOpenModal = () => setIsOpenModal(true)

  const [state, formAction] = useFormState(createAgencie, initialState)
  console.log('state', state)

  // useEffect(() => {
  //   console.log('EFFECT')
  //   if(state.sucess) {
  //     handleCloseModal()
  //   }
  // }, [state.sucess])
  useEffect(() => {
    console.log('EFFECT')
    if(state.success) {
      handleCloseModal()
    }

  }, [state.success])


  return (
    <>
      <button
        onClick={handleOpenModal}
        className="btn btn-primary"
        type="button"
      >
        Agregar Agencia
      </button>
      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
          <form action={formAction}>
            <Input
              name="company"
              labelText={'Nombre de agencia'}
              type="text"
              required
            />
            <Input labelText={'Ruc'} name="ruc" type="number" required />

            <Input labelText={'Dirección'} name="address" type="text" />
            <SubmitButton />
          </form>
        </Modal>
      )}
    </>
  )
}

export default AddAgencieForm
