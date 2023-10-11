'use client'

import Input from './input'
import { useState, useRef, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
function NewQuotation() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const modalRef = useRef()

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      setLoading(true)
      const supabase = createClientComponentClient()
      const quotationToCreate = {
        ruc: '20100170681',
        company: 'PRODUCTOS QUIMICOS INDUSTRIALES S A',
        address: 'AV. EL SANTUARIO NRO. 1239 Z.I. ZARATE LIMA LIMA SAN JUAN DE LURIGANCHO',
        deadline: 1,
        items: [
          {
            id: '76ed35bd-5844-437d-a6f2-b985aa8afbf0',
            qty: 4,
            price: 45,
            unit_size: '69x30cm',
            description:
              'Vinil arclad laminado aplicado sobre lamina imantada de 0.8 mm',
          },
          {
            id: 'f7f907ed-aaf0-485a-a2d8-58793e98abf0',
            qty: 1,
            price: 75,
            unit_size: '40x50cm',
            description:
              'Señal vinil arclad laminado c/ soporte compuesto de aluminio ( sustrato de aluminio ) de 4 mm espesor',
          },
          {
            id: '2fd72019-9c29-42c0-88fe-7279f68d0eb5',
            qty: 50,
            price: 4.5,
            unit_size: '20x30cm',
            description:
              'Señal vinil arclad laminado brillo (proteccion UV) c/ soporte pvc celtex espesor = 3 mm',
          },
          {
            id: '883e65c4-66e6-499e-8649-2716a292d750',
            qty: 1,
            price: 5,
            unit_size: '20x30cm',
            description:
              'Señal vinil arclad laminado brillo (proteccion UV) c/ soporte pvc celtex espesor = 3 mm',
          },
          {
            id: 'a1974045-9278-4304-a1ac-a7a6c8e6ddd4',
            qty: 7,
            price: 9,
            unit_size: '40X30',
            description: 'Pvc',
          },
        ],
      }

      const { data, error } = await supabase
        .from('quotations')
        .insert(quotationToCreate)
        .select()
        .single()

      if (error) {
        throw new Error('error create quotation')
      }

      setIsOpenModal(false)

      console.log('create quotation', data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpenModal) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpenModal])

  return (
    <div>
      <button onClick={handleOpenModal} className="btn btn-primary">
        Crear
      </button>
      <dialog
        ref={modalRef}
        className="modal"
        onMouseDown={e => {
          if (e.target === e.currentTarget) {
            handleCloseModal()
          }
        }}
      >
        <div className="modal-box">
          <header className="flex ">
            <button onClick={handleCloseModal} className="btn">
              Cancel
            </button>
          </header>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              labelText="Ruc"
              name="ruc"
              type="number"
              placeholder="20610555536"
            />

            <Input
              labelText="Cliente"
              name="company"
              type="text"
              placeholder="tell senales s.a.c."
            />

            <Input
              labelText="Dirección"
              name="address"
              type="text"
              placeholder="Av. Maquinaria 325 - Cercado de Lima"
            />

            <button disabled={loading} className="btn btn-primary">
              {loading ? 'Loading...' : 'Create'}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default NewQuotation
