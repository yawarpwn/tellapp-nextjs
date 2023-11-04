'use client'

import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'
import { useEffect, useState } from 'react'
import ItemModal from './item-modal'
import confetti from 'canvas-confetti'
import CustomersModal from '@/ui/quotations/customers-modal'

const initialState = {
  message: null,
  errors: {},
}

const initialQuotation = {
  company: '',
  ruc: '',
  address: '',
  deadline: '',
  items: [],
}

function AddForm({ quotationToUpdate, action, serverCustomers }) {
  const [state, dispatch] = useFormState(action, initialState)
  const [quotation, setQuotation] = useState(
    quotationToUpdate || initialQuotation,
  )

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenCustomersModal, setIsOpenCustomersModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const closeModal = () => setIsOpenModal(false)
  const openModal = () => setIsOpenModal(true)
  const openCustomersModal = () => setIsOpenCustomersModal(true)
  const closeCustomersModal = () => setIsOpenCustomersModal(false)

  const updateCompanyInfo = ({ ruc, company, address }) => {
    setQuotation({
      ...quotation,
      ruc,
      company,
      address,
    })
  }

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

  const editItem = itemToEdit => {
    setEditingItem(itemToEdit)
    openModal()
  }

  const onCloseModal = () => {
    setEditingItem(null)
    closeModal()
  }

  const handleCustomerPick = customer => {
    setQuotation({
      ...quotation,
      company: customer.name,
      ruc: customer.ruc,
      address: customer.address,
    })
    closeCustomersModal()
  }

  const handleEditItem = itemToEdit => {
    setQuotation({
      ...quotation,
      items: quotation.items.map(item => {
        if (item.id === itemToEdit.id) {
          return itemToEdit
        }
      }),
    })
  }

  return (
    <>
      <ItemModal
        isOpenModal={isOpenModal}
        onCloseModal={onCloseModal}
        onAddItem={addItem}
        editingItem={editingItem}
        onEditItem={handleEditItem}
      />
      <CustomersModal
        isOpenModal={isOpenCustomersModal}
        onCloseModal={closeCustomersModal}
        serverCustomers={serverCustomers}
        onCustomerPick={handleCustomerPick}
      />
      <div className="flex justify-between">
        <div />
        <button onClick={openCustomersModal} className="btn">
          Cliente frecuentes
        </button>
      </div>
      <form
        action={async formData => {
          await dispatch(formData)
          confetti()
        }}
      >
        <CreateEditInputs
          onChange={handleChange}
          quotation={quotation}
          state={state}
          onDeleteItem={deleteItem}
          onAddItem={addItem}
          onEditItem={editItem}
          onOpenModal={openModal}
          updateCompanyInfo={updateCompanyInfo}
        />
      </form>
    </>
  )
}

export default AddForm
