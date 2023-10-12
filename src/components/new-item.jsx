'use client'
import { useRef, useState, useEffect } from 'react'
import Input from '@/components/input'
import Modal from '@/components/modal'
import { PlusIcon } from '@/icons'

const initialState = {
  qty: 0,
  price: 0,
  unit_size: '',
  description: '',
}

function NewItem({ modalRef, onCloseModal, addItem, editItem, editingItem }) {
  const [item, setItem] = useState(editingItem || initialState)
  console.log({ editingItem, item })

  const handleSearchProduct = (event, index) => {
    console.log('search', { index, event })
  }

  const handleChangeItem = event => {
    let { value, name } = event.target

    if (name === 'qty' || name === 'price') {
      value = Number(value)
    }

    setItem(prev => ({ ...prev, [name]: value }))
  }

  const inputSearchRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()

    // Si Es edicion
    if (editingItem) {
      console.log('editing item')
      editItem(item)
      setItem(() => initialState)
      onCloseModal()
    } else {

      //Si es nuevo
      const id = crypto.randomUUID()
      const newItem = {
        ...item,
        id,
      }

      addItem(newItem)
      setItem(() => initialState)
      onCloseModal()
    }
  }

  return (
    <Modal modalRef={modalRef} onClose={onCloseModal}>
      <div>
        <h2 className="text-primary text-2xl font-bold">Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 items-center">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea w-full"
                ref={inputSearchRef}
                onChange={handleChangeItem}
                value={item.description}
                name="description"
                required
              />
            </div>
            <div className="flex gap-2">
              <Input
                onChange={handleChangeItem}
                value={item.unit_size}
                type="text"
                labelText="U/M"
                name="unit_size"
                required
              />
              <Input
                onChange={handleChangeItem}
                value={item.qty}
                type="number"
                labelText="Cantidad"
                name="qty"
                required
              />
              <Input
                onChange={handleChangeItem}
                value={item.price}
                type="number"
                labelText="Precio"
                name="price"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              <PlusIcon /> Agregar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default NewItem
