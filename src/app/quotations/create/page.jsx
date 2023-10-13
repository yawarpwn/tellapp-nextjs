'use client'

import Input from '@/components/input'
import { useState, useRef, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { quotationToCreate } from '@/utils'
import { DeleteIcon, EditIcon, PlusIcon } from '@/icons'
import clsx from 'clsx'
import { getRuc, getDni } from '@/services/sunat'
import ItemModal from '@/components/item-modal'
import TableItems from '@/components/table-items'

const initialState = {
  ruc: '',
  company: 'Sin Ruc proporcionado',
  address: '',
  deadline: 1,
  items: [],
}

function NewQuotation() {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [quotation, setQuotation] = useState(quotationToCreate)
  const [editingItem, setEditingItem] = useState(null)
  const modalRef = useRef()

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
      {/* Form  */}
      <ItemModal
        onAddItem={handleAddItem}
        onCloseModal={handleCloseModal}
        modalRef={modalRef}
        editingItem={editingItem}
        onEditItem={handleEditItem}
      />
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
          <p className="text-xl text-green-300">{quotation.company}</p>
          <p className="text-md">{quotation.address}</p>
        </div>

        {/* List Items  */}
        <h3>Productos</h3>
        {quotation?.items && (
          <TableItems
            items={quotation.items}
            onDeleteItem={handleDeleteItem}
            onOpenModal={handleOpenModal}
            onEditItem={handleEditItem}
          />
        )}

        <button type="button" onClick={() => handleOpenModal()} className="btn btn-outline btn-primary">
          <PlusIcon /> Agregar Producto
        </button>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Loading...' : 'Crear Cotización'}
        </button>
      </form>
    </div>
  )
}

export default NewQuotation
