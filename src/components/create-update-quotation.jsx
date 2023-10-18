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
import Modal from './modal'

const initialState = {
  ruc: '',
  company: 'Sin Ruc proporcionado',
  address: '',
  deadline: 1,
  items: [],
}

function CreateUpdateQuotation({ serverQuotation }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [quotation, setQuotation] = useState(serverQuotation || initialState)
  const [editingItem, setEditingItem] = useState(null)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)

  console.log(isOpenModal)

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
    if (quotation.items.length === 0) {
      const notify = () => toast.error('Debe ingresar al menos un producto')
      notify()
      return
    }

    // Create quotation
    if (!serverQuotation) {
      try {
        setLoading(true)

        const { data, error } = await supabase
          .from('quotations')
          .insert(quotation)
          .select()
          .single()

        if (error) {
          console.log('error', error)
          throw new Error('error create quotation')
        }
        setIsOpenModal(false)
        window.navigation.navigate('/')

        console.log('create quotation', data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      // Update quotation
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('quotations')
          .update(quotation)
          .eq('id', quotation.id)

        if (error) {
          console.log('error', error)
          throw new Error('error create quotation')
        }

        console.log('update quotation', data)

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
    <div>
      <Toaster />
      {/* Form  */}
      {isOpenModal && (
          <ItemModal
          isOpenModal={isOpenModal}
          onCloseModal={handleCloseModal}
            onAddItem={handleAddItem}
            editingItem={editingItem}
            onEditItem={handleEditItem}
          />
      )}
      <div>
        <h2 className="text-warning font-bold text-2xl">
          #{serverQuotation ? quotation.number : '5000'}
        </h2>
      </div>
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
        <buttton
          type="button"
          className="btn btn-primary"
          onClick={() => setIsOpenConfirmModal(true)}
        >
          {serverQuotation ? 'Actualizar' : 'Crear'}
        </buttton>
        <ConfirmModal
          isOpen={isOpenConfirmModal}
          onCloseModal={() => setIsOpenConfirmModal(false)}
          loading={loading}
        ></ConfirmModal>
      </form>
    </div>
  )
}

export default CreateUpdateQuotation
