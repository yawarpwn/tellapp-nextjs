'use client'

import Modal from './modal'
import { useState } from 'react'
function CustomersModal({
  isOpenModal,
  onCloseModal,
  onCustomerPick,
  serverCustomers,
}) {
  const [selectedCustomer, setSelectedCustomer] = useState(
    serverCustomers[0].id,
  )

  const handleSubmit = event => {
    event.preventDefault()
    if (selectedCustomer !== null) {
      onCustomerPick(selectedCustomer)
      onCloseModal()
    } else {
      return
    }
  }

  const hasCustomers = serverCustomers && serverCustomers.length > 0

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <form className="relative" onSubmit={handleSubmit}>
        {hasCustomers &&
          serverCustomers.map(customer => {
            return (
              <label
                className="flex items-center justify-between gap-x-4"
                key={customer.id}
              >
                <p className="py-2">{customer.name}</p>
                <input
                  onChange={() => {
                    setSelectedCustomer(customer)
                  }}
                  type="checkbox"
                  className="checkbox"
                  checked={selectedCustomer?.id === customer.id}
                />
              </label>
            )
          })}
        <footer className="py-4">
          <button className="btn btn-primary w-full">Agregar</button>
        </footer>
      </form>
    </Modal>
  )
}

export default CustomersModal
