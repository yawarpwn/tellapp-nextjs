'use client'
import Input from '@/components/input'
import Modal from '@/components/modal'
import { updateAgencie } from './actions'
import { useState } from 'react'
// import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { EditIcon, UpdateIcon } from '@/icons'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      aria-disabled={pending}
      disabled={pending}
      type="submit"
      className="btn btn-primary mt-4 w-full"
    >
      {pending ? (
        <span className="loading loading-dots loading-sm">Actualizando</span>
      ) : (
        <>
          <UpdateIcon />
          Actualizar
        </>
      )}
    </button>
  )
}

function AddAgencieForm({ agency }) {
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
        <EditIcon />
      </button>
      {isOpenModal && (
        <Modal isOpen={isOpenModal} onClose={closeModal}>
          <header>
            <h2 className="text-primary font-bold text-xl">Editar Agencia</h2>
          </header>
          <form
            action={async formData => {
              await updateAgencie(formData)
              closeModal()
            }}
          >
            <Input
              name="company"
              labelText={'Agencia'}
              type="text"
              required
              defaultValue={agency.company}
            />
            <Input
              labelText={'Ruc'}
              name="ruc"
              type="number"
              defaultValue={agency.ruc}
              required
            />

            <Input
              labelText={'Dirección'}
              name="address"
              placeholder='Dirección'
              
              type="text"
              defaultValue={agency.address ?? ''}
            />
            <input className="sr-only" name="id" defaultValue={agency.id} />
            <SubmitButton onCloseModal={closeModal} />
          </form>
        </Modal>
      )}
    </>
  )
}

export default AddAgencieForm
