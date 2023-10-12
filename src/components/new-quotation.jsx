'use client'

import Input from './input'
import { useState, useRef, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { quotationToCreate } from '@/utils'
import { DeleteIcon, EditIcon } from '@/icons'
import clsx from 'clsx'
import { getRuc, getDni } from '@/services/sunat'
import Modal from './modal'

const initialState = {
  ruc: '',
  company: 'Sin Ruc proporcionado',
  address: '',
  deadline: 1,
  items: [],
}

function NewQuotation() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [quotation, setQuotation] = useState(quotationToCreate)
  const modalRef = useRef()

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const handleAddItem = () => {
    const id = crypto.randomUUID()
    setQuotation(prev => ({
      ...prev,
      items: [
        ...quotation.items,
        { id, description: '', qty: 0, unit_size: 0, price: 0 },
      ],
    }))
  }

  const handleDeleteItem = id => {
    console.log('handle Delete')
    setQuotation(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }))
  }

  const handleChange = event => {
    const { value, name } = event.target
    setQuotation(prev => ({ ...prev, [name]: value }))
  }

  const handleBlur = async event => {
    const { value } = event.target
    const isRuc = value.length === 11
    const isDni = value.length === 8

    try {
      setLoading(true)
      if (isDni) {
        const { company, ruc, address } = await getDni(value)
        setQuotation(prev => ({
          ...prev,
          company,
          ruc,
          address,
        }))
      }

      if (isRuc) {
        const { ruc, company, address } = await getRuc(value)
        setQuotation(prev => ({
          ...prev,
          ruc,
          company,
          address,
        }))
      }
    } catch (error) {
      // TODO:Toast
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const products = []

  const handleSearchProduct = (event, index) => {
    console.log('search', { index, event })
  }

  const handleSubmit = async event => {
    try {
      event.preventDefault()
      setLoading(true)
      const supabase = createClientComponentClient()

      const { data, error } = await supabase
        .from('quotations')
        .insert(quotation)
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
      {/* Form  */}
      <Modal modalRef={modalRef} onClose={handleCloseModal}>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2">
            <Input
              labelText="Ruc"
              name="ruc"
              type="number"
              placeholder="20610555536"
              value={quotation.ruc}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Input
              labelText="Tiempo de entrega"
              name="deadline"
              type="number"
              placeholder="10"
              value={quotation.deadline}
              onChange={handleChange}
            />
          </div>
          <div>
            <p className="text-xl text-green-300">{quotation.company}</p>
            <p className="text-md">{quotation.address}</p>
          </div>
          <h3>Productos</h3>

          <div>
            <table className="table">
              <thead>
                <th>Descripción</th>
                <th>U/M</th>
                <th>Cant</th>
                <th>P. Unit</th>
                <th>Acciones</th>
              </thead>
              <tbody>
                {quotation.items?.map((item, index) => {
                  const even = index % 2 === 0
                  return (
                    <tr key={item.id} className={`${even ? 'bg-black/10' : ''  }`}>
                      <td>{item.description}</td>
                      <td>{item.unit_size}</td>
                      <td>{item.qty}</td>
                      <td>{item.price.toFixed(2)}</td>
                      <td>
                        <div className="flex gap-x-1">
                          <button type="button" className="btn">
                            <EditIcon />
                          </button>

                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            type="button"
                            className="btn"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                <tr className="bg-black/20">
                  <td
                    colSpan={3}
                    className="text-right py-3 px-4 uppercase font-semibold text-sm"
                  >
                    Total :
                  </td>
                  <td colSpan={3} className="text-left py-3 px-4">
                    220.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button type="button" onClick={handleAddItem} className="btn">
            add item
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Loading...' : 'Create'}
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default NewQuotation
