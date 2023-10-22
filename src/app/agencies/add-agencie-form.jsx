'use client'
import Input from '@/components/input'
import Modal from '@/components/modal'
import { PlusIcon } from '@/icons'
import { createAgencie } from './actions'
import {  useState } from 'react'
// import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

function SubmitButton() {
  const status = useFormStatus()

  return (
    <button type="submit" className="btn btn-primary w-full mt-4">
      {status.pending ? (
        <>
          <span className="loading loading-spinner"></span>
        </>
      ) : (
        <>
          <PlusIcon />
          Crear Agencia
        </>
      )}
    </button>
  )
}


function AddAgencieForm() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const closeModal = () => setIsOpenModal(false)
  const openModal = () => setIsOpenModal(true)

  return (
    <>
      <button
        onClick={openModal}
        className="btn btn-primary"
        type="button"
      >
        Agregar Agencia
      </button>
      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={closeModal}>
          <form action={async (formData) => {
            await createAgencie(formData)
            closeModal()
          }}>
            <Input
              name="company"
              labelText={'Nombre de agencia'}
              placeholder="Shalom Empresarial"
              type="text"
              required
            />
            <Input
              labelText={'Ruc'}
              name="ruc"
              type="number"
              placeholder="206006666035"
              required
            />
            <Input
              labelText={'Dirección'}
              name="address"
              type="text"
              placeholder="Av. Fauccett 232 - Callao"
            />
            <SubmitButton />
          </form>
        </Modal>
      )}
    </>
  )
}

export default AddAgencieForm
