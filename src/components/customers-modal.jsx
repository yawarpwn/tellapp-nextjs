'use client'

import InputSearch from './input-search'
import Modal from './modal'
import { useMemo, useState } from 'react'
function CustomersModal({
  isOpenModal,
  onCloseModal,
  onCustomerPick,
  serverCustomers,
}) {
  const [filter, setFilter] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState(
    serverCustomers[0].id,
  )

  console.log({ filter })

  const handleSubmit = event => {
    event.preventDefault()
    if (selectedCustomer !== null) {
      onCustomerPick(selectedCustomer)
      onCloseModal()
    } else {
      return
    }
  }

  const customersToRender = useMemo(() => {
    if (filter) {
      const filteredCustomers = serverCustomers.filter(customer => {
        const filterLower = filter.toLocaleLowerCase()
        const customerNameLower = customer.name.toLowerCase()
        return customerNameLower.includes(filterLower)
      }
      )
      return filteredCustomers

    } else {
      return serverCustomers
    }

  }, [filter, serverCustomers])

  const handleSearchCustomer = (event) => {
    const { value } = event.target
    setFilter(value)
  }

  const hasCustomers = serverCustomers && serverCustomers.length > 0

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <InputSearch placeholder={'Buscar cliente'} onSearchChange={handleSearchCustomer} />
      <form className="relative" onSubmit={handleSubmit}>
        {hasCustomers &&
          customersToRender.map(customer => {
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
