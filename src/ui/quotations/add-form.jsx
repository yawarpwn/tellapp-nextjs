'use client'

import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'
import ItemModal from './item-modal'
import confetti from 'canvas-confetti'
import CustomersModal from '@/ui/quotations/customers-modal'
import useQuotations from '@/hooks/use-quotations'
import useAutoSave from '@/hooks/use-autosave'
import { useEffect, useState } from 'react'

const initialState = {
  message: null,
  errors: {},
}

function AddForm({ quotationToUpdate, action, serverCustomers }) {
  const [state, dispatch] = useFormState(action, initialState)
  const [savedQuotation, setSavedQuotation] = useState(null)

  useEffect(() => {

  }, [])
  const savedQuotation = () => {}

  useAutoSave({callback: savedQuotation, delay: 1000 })

  const {
    addItem,
    deleteItem,
    updateItem,
    updateQuotation,
    openCustomersModal,
    closeCustomersModal,
    handleInputChange,
    openEditItemModal,
    openItemModal,
    closeEditItemModal,
    quotation,
    isItemModalOpen,
    isCustomersModalOpen,
    editingItem,
  } = useQuotations({ initialData: quotationToUpdate })

  return (
    <>
      <ItemModal
        isOpenModal={isItemModalOpen}
        onCloseModal={closeEditItemModal}
        editingItem={editingItem}
        addItem={addItem}
        updateItem={updateItem}
      />
      <CustomersModal
        isOpenModal={isCustomersModalOpen}
        onCloseModal={closeCustomersModal}
        serverCustomers={serverCustomers}
        onCustomerPick={updateQuotation}
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
          onChange={handleInputChange}
          quotation={quotation}
          state={state}
          onDeleteItem={deleteItem}
          onAddItem={addItem}
          updateQuotation={updateQuotation}
          openEditItemModal={openEditItemModal}
          openItemModal={openItemModal}
          deleteItem={deleteItem}
        />
      </form>
    </>
  )
}

export default AddForm
