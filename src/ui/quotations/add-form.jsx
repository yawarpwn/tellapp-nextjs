'use client'

import { createProduct } from '@/lib/actions/products'
import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'
import { useState } from 'react'
import { PlusIcon } from '@/icons'
import ItemModal from './item-modal'

const initialState = {
  message: null,
  errors: {},
}

const initialQuotation = {
  ruc: '20305100',
  company: 'Sin Ruc proporcionado',
  address: 'En un lugalglj z',
  deadline: 1,
  items: [
    {
      id: '2zdjlzz',
      price: 20,
      qty: 2,
      unit_size: 'und',
      description: 'producto de preuba para ananorjf ajdalsl',
    },
  ],
}

function AddForm({ quotationToUpdate }) {
  const [state, dispatch] = useFormState(createProduct, initialState)
  const [quotation, setQuotation] = useState(
    quotationToUpdate || initialQuotation,
  )

  const [isOpenModal, setIsOpenModal] = useState(false)

  const closeModal = () => setIsOpenModal(false)
  const openModal = () => setIsOpenModal(true)
  const handleChange = event => {
    let { name, value } = event.target

    if (name === 'price' || name === 'qty') {
      value = parseInt(value)
    }

    setQuotation({
      ...quotation,
      [name]: value,
    })
  }

  const deleteItem = id => {
    setQuotation({
      ...quotation,
      items: quotation.items.filter(item => item.id !== id),
    })
  }

  const addItem = item => {
    setQuotation({
      ...quotation,
      items: [...quotation.items, item],
    })
  }

  const editItem = () => {}

  return (
    <>
      <ItemModal isOpenModal={isOpenModal} onCloseModal={closeModal} />
      <form action={dispatch}>
        <CreateEditInputs
          onChange={handleChange}
          quotation={quotation}
          state={state}
          onDeleteItem={deleteItem}
          onAddItem={addItem}
          onEditItem={editItem}
        />
      </form>
      <button onClick={openModal} className="btn w-full btn-primary">
        <PlusIcon />
        Agregar Item
      </button>
    </>
  )
}

export default AddForm
