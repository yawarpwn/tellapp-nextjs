'use client'

import Input from '@/components/input'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PlusIcon } from '@/icons'
import { getRuc, getDni } from '@/services/sunat'
import ItemModal from '@/components/item-modal'
import TableItems from '@/components/table-items'
import toast, { Toaster } from 'react-hot-toast'
import ConfirmModal from './confirm-modal'
import CustomersModal from './customers-modal'
import { getFormatedDate } from '@/utils'
import { shootCoffeti } from '@/services/confetti'
import { insertRow, updateRow } from '@/services/supabase'

const initialState = {
  ruc: '',
  company: 'Sin Ruc proporcionado',
  address: '',
  deadline: 1,
  items: [],
}

function CreateUpdateQuotation({
  serverQuotation,
  serverCustomers,
  lastQuotationNumber,
}) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [quotation, setQuotation] = useState(serverQuotation || initialState)
  const [editingItem, setEditingItem] = useState(null)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false)
  const [checked, setChecked] = useState(false)

  const formatedDate = getFormatedDate(
    serverQuotation && serverQuotation.created_at,
  )

  const handleOpenModal = item => {
    setIsOpenModal(true)
    setEditingItem(item)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
    setEditingItem(null)
  }

  const handleAddItem = item => {
    setQuotation(prev => ({
      ...prev,
      items: [...quotation.items, item],
    }))
  }

  const handleCustomerPick = customer => {
    setQuotation(prev => ({
      ...prev,
      company: customer.name,
      ruc: customer.ruc,
      address: customer.address,
    }))
  }

  const handleDeleteItem = id => {
    setQuotation(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }))
  }

  const handleEditItem = itemToEdit => {
    setQuotation(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === itemToEdit.id ? itemToEdit : item,
      ),
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

  const supabase = createClientComponentClient()

  const handleSubmit = async event => {
    event.preventDefault()

    if (
      checked &&
      quotation.ruc.length === 11 &&
      quotation.company !== 'Sin Ruc proporcionado'
    ) {
      const customerToCreate = {
        name: quotation.company,
        ruc: quotation.ruc,
        address: quotation.address,
      }
      await insertRow({
        client: supabase,
        table: 'customers',
        row: customerToCreate,
      })
    }

    if (quotation.items.length === 0) {
      const notify = () => toast.error('Debe ingresar al menos un producto')
      notify()
      return
    }

    // Create quotation
    if (!serverQuotation) {
      const quotationToInsert = {
        ...quotation,
        number: lastQuotationNumber + 1,
      }

      try {
        setLoading(true)
        await insertRow({
          client: supabase,
          table: 'quotations',
          row: quotationToInsert,
        })
        setIsOpenModal(false)
        shootCoffeti()
        window.navigation.navigate(`/quotations/${lastQuotationNumber + 1}`)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      // Update quotation
      try {
        setLoading(true)
        await updateRow({
          client: supabase,
          table: 'quotations',
          row: quotation,
        })
        shootCoffeti()
        setIsOpenModal(false)
        window.navigation.navigate(`/quotations/${quotation.number}`)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <section>
      <Toaster />
      {isOpenModal && (
        <ItemModal
          isOpenModal={isOpenModal}
          onCloseModal={handleCloseModal}
          onAddItem={handleAddItem}
          editingItem={editingItem}
          onEditItem={handleEditItem}
        />
      )}
      {isCustomerModalOpen && (
        <CustomersModal
          isOpenModal={isCustomerModalOpen}
          onCloseModal={() => setIsCustomerModalOpen(false)}
          onCustomerPick={handleCustomerPick}
          serverCustomers={serverCustomers}
        />
      )}
      <header className="p-4 flex items-center justify-between">
        <h2 className="text-warning font-bold text-2xl">
          #{serverQuotation ? quotation.number : lastQuotationNumber + 1}
        </h2>
        <button
          onClick={() => setIsCustomerModalOpen(true)}
          type="button"
          className="btn btn-warning"
        >
          Clientes Frecuentes
        </button>
      </header>
      <form className="flex flex-col gap-2" >
        <div className="flex justify-between gap-2">
          <Input
            labelText="Ruc"
            autoFocus={!serverQuotation}
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
          <Input labelText="Fecha" type="date" disabled value={formatedDate} />
        </div>
        <div>
          <Input
            labelText="Cliente"
            name="company"
            placeholder="Sin Ruc Proporcionado"
            value={quotation.company}
            disabled
          />

          <Input
            labelText="Dirección"
            name="address"
            placeholder=""
            value={quotation.address}
            disabled
          />
        </div>
        <div className="flex gap-2 py-2 items-center">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <span>Agregar a clientes frecuentes</span>
        </div>

        {/* List Items  */}
        <h3 className="text-2xl font-bold">Lista de Productos</h3>
        {quotation?.items && (
          <TableItems
            items={quotation.items}
            onDeleteItem={handleDeleteItem}
            onOpenModal={handleOpenModal}
            onEditItem={handleEditItem}
          />
        )}

        <button
          type="button"
          onClick={() => handleOpenModal()}
          className="btn btn-outline "
        >
          <PlusIcon /> Agregar Producto
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsOpenConfirmModal(true)}
        >
          {serverQuotation ? 'Actualizar' : 'Crear'}
        </button>
        <ConfirmModal
          isOpen={isOpenConfirmModal}
          onCloseModal={() => setIsOpenConfirmModal(false)}
          loading={loading}
          onConfirm={handleSubmit}
        ></ConfirmModal>
      </form>
    </section>
  )
}

export default CreateUpdateQuotation
