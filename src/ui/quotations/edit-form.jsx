
'use client'

import { updateQuotation } from '@/lib/actions/quoatations'
import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'
import { useState } from 'react'
import { PlusIcon } from '@/icons'
import ItemModal from './item-modal'
import { quotationToCreate } from '@/utils'

const initialState = {
  message: null,
  errors: {},
}


function AddForm({ quotationToUpdate }) {
  const [state, dispatch] = useFormState(updateQuotation, initialState)
  const [quotation, setQuotation] = useState(
    quotationToUpdate || quotationToCreate,
  )

  console.log('state: ', state)
  console.log('quoatations', quotation)

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
      <ItemModal
        isOpenModal={isOpenModal}
        onCloseModal={closeModal}
        onAddItem={addItem}
      />
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
