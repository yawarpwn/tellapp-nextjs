'use client'
import Input from './input'
import { useState, useRef, useEffect } from 'react'
function NewQuotation() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  console.log('isMOdalOpen:', isOpenModal)
  const modalRef = useRef()

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  useEffect(() => {
    if(isOpenModal) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    } 

  }, [isOpenModal])


  return (
    <div>
      <button onClick={handleOpenModal} className='btn btn-primary'>Crear</button>
      <dialog ref={modalRef} className='modal'>
        <div className='modal-box'>
          <header className='flex '>
            <button onClick={handleCloseModal} className='btn'>
              Cancel
            </button>
          </header>
          <form className="flex flex-col gap-2">
            <Input
              labelText="Ruc"
              name="ruc"
              type="number"
              placeholder="20610555536"
              required
            />

            <Input
              labelText="Cliente"
              name="company"
              type="text"
              placeholder="tell senales s.a.c."
              required
            />

            <Input
              labelText="Dirección"
              name="address"
              type="text"
              placeholder="Av. Maquinaria 325 - Cercado de Lima"
              required
            />

            <button className="btn btn-primary">Agregar</button>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default NewQuotation
