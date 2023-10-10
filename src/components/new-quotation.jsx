'use client'

import Input from './input'
import { useState, useRef, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
function NewQuotation() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log('isMOdalOpen:', isOpenModal)
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
        ruc: '20610555537',
        company: 'Nueva empresa E.I.R.L',
        address: 'Av. Av. Argentina 538 - Lima - Lima',
        deadline: 10,
        items: [
          {
            id: '1020',
            name: 'Fibra de vidrio 4mm',
            qty: 10,
            unit_price: 100,
          },
          {
            id: '1030',
            name: 'Sustrato de aluminio 4mm',
            qty: 20,
            unit_price: 50,
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

            <button disabled={loading} className="btn btn-primary">{loading ? 'Loading...' : 'Create'}</button>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default NewQuotation
