'use client'

import Input from './input'
import { useState, useRef, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { DeleteIcon } from '@/icons'
import clsx from 'clsx'

const initialState = {
  ruc: '',
  company: '',
  address: '',
  deadline: 0,
  items: [],
}

function NewQuotation() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [quotation, setQuotation] = useState(initialState)
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
    setQuotation(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }))
  }

  const handleChangeItem = (event, index) => {
    let{ name, value } = event.target

    if(name === 'qty' ||  name === 'price') {
      value = Number(value)
    }

    const list = [...quotation.items]
    list[index][name] = value
    setQuotation(prev => ({ ...prev, items: list}))
  }

  const handleChange = (event) => {
    const { value, name} = event.target
    setQuotation(prev => ({...prev, [name]: value}))
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
      <dialog
        ref={modalRef}
        className="modal"
        onMouseDown={e => {
          if (e.target === e.currentTarget) {
            handleCloseModal()
          }
        }}
      >
        <div className="modal-box w-11/12 max-w-5xl">
          <button
            onClick={handleCloseModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500"
          >
            ✕
          </button>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <Input
              labelText="Ruc"
              name="ruc"
              type="number"
              placeholder="20610555536"
              value={quotation.ruc}
              onChange={handleChange}
            />

            <Input
              labelText="Cliente"
              name="company"
              type="text"
              placeholder="tell senales s.a.c."
              value={quotation.company}
              onChange={handleChange}
            />

            <Input
              labelText="Dirección"
              name="address"
              type="text"
              placeholder="Av. Maquinaria 325 - Cercado de Lima"
              value={quotation.address}
              onChange={handleChange}
            />
            <div>Productos</div>
            {quotation.items?.map((item, index) => {
              // const even = index % 2 === 0
              return (
                <div key={item.id} className={''}>
                  <div className="flex gap-x-2 items-center">
                    <Input
                      onChange={event => handleChangeItem(event, index)}
                      type="search"
                      labelText={'Descripción'}
                      name={'description'}
                      classContainer={'flex-1'}
                      required
                    />

                    <Input
                      onChange={event => handleChangeItem(event, index)}
                      type="text"
                      className="w-20"
                      labelText="U/M"
                      name="unit_size"
                      required
                    />
                    <Input
                      onChange={event => handleChangeItem(event, index)}
                      type="number"
                      className="w-20"
                      labelText="Cantidad"
                      name="qty"
                      required
                    />
                    <Input
                      onChange={event => handleChangeItem(event, index)}
                      type="number"
                      className="w-20"
                      labelText="Precio"
                      name="price"
                      required
                    />
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      type="button"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              )
            })}
            <button type="button" onClick={handleAddItem} className="btn">
              add item
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Loading...' : 'Create'}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default NewQuotation
