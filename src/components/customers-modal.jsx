'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Modal from './modal'
import { useEffect, useState } from 'react'
function CustomersModal({ isOpenModal, onCloseModal, onCustomerPick }) {
  const [customers, setCustomers] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState(
    customers.length > 0 ? customers[0].id : null,
  )
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const supabase = createClientComponentClient()
    supabase
      .from('customers')
      .select()
      .order('name', { ascending: true })
      .then(({ data }) => {
        setCustomers(data)
        setLoading(false)
      })
  }, [])

  const handleSubmit = event => {
    event.preventDefault()
    if (selectedCustomer !== null) {
      onCustomerPick(selectedCustomer)
      onCloseModal()
    } else {
      return
    }
  }

  const hasCustomers = customers && customers.length > 0

  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <form className="relative" onSubmit={handleSubmit}>
        {loading && (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}
        {hasCustomers &&
          customers.map(customer => {
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
