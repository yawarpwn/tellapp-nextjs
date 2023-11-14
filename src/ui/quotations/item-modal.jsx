import Modal from '@/ui/modal'
import { useRef, useState, useEffect, useMemo } from 'react'
import { XIcon } from '@/icons'
import Input from '@/ui/components/input'
import { createSearchInstance } from '@/services/search'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const initialState = {
  qty: 0,
  price: 0,
  unit_size: '',
  description: '',
  cost: '',
}
function ItemModal({
  isOpenModal,
  onCloseModal,
  editingItem,
  addItem,
  updateItem
}) {

  console.log('editingItem', editingItem)

  const [item, setItem] = useState(initialState)
  const [showClearDescription, setShowClearDescription] = useState(false)
  const searchInstance = useRef(null)

  useEffect(() => {
    const supabase = createClientComponentClient()
    const getProducts = async () => {
      const { data } = await supabase.from('products').select()
      searchInstance.current = createSearchInstance(data)
    }

    getProducts()
  }, [])

  useEffect(() => {
    if (editingItem) {
      setItem(editingItem)
    } else {
      setItem(initialState)
    }
  }, [editingItem])

  useEffect(() => {
    if (item.description.length >= 3) {
      setShowClearDescription(true)
    } else {
      setShowClearDescription(false)
    }
  }, [item.description])

  const resultsToRender = useMemo(() => {
    if (item.description.length > 1) {
      const searchResult = searchInstance?.current?.search(item.description)
      const searchResultMapped = searchResult?.map(({ item }) => item)
      return searchResultMapped
    }
    return []
  }, [item.description])

  const handleChangeItem = event => {
    let { value, name } = event.target

    if (name === 'qty' || name === 'price') {
      value = Number(value)
    }

    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (editingItem) {
      updateItem(item)
      setItem(() => initialState)
      onCloseModal()
    } else {
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

  const handleProductClick = product => {
    if (!item.qty || !item.price) {
      setItem({
        ...item,
        description: product.description,
        unit_size: product.unit_size,
        price: product.price,
        cost: product.cost,
        qty: 1,
      })
    } else {
      setItem({
        ...item,
        unit_size: product.unit_size,
        description: product.description,
        cost: product.cost
      })
    }
  }

  const clearDescription = () => {
    setItem(prev => ({
      ...prev,
      description: '',
    }))
  }

  return (
    <Modal
      size="lg"
      isOpen={isOpenModal}
      onClose={onCloseModal}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 ">
          <div className="form-control relative">
            {showClearDescription && (
              <button
                type="button"
                onClick={clearDescription}
                className="btn btn-circle btn-xs absolute right-2 top-12"
              >
                <XIcon />
              </button>
            )}
            <label className="label">
              <span className="label-text">Descripción</span>
            </label>
            <textarea
              autoFocus
              className="textarea textarea-primary h-[120px]  w-full resize-none"
              placeholder="Buscar producto"
              // type="search"
              onChange={handleChangeItem}
              // labelText="Descripción"
              value={item.description}
              name="description"
              required
            />
          </div>

          <ul className="menu bg-none w-full bg-base-200 flex-nowrap gap-4  rounded-box h-[300px] overflow-y-auto">
            {resultsToRender?.length > 0
              ? resultsToRender.map(item => (
                <li
                  onClick={() => handleProductClick(item)}
                  className="flex gap-x-1 "
                  key={item.id}
                >
                  <div className="p-0 flex items-center gap-x-2">
                    <span className="btn btn-primary btn-xs h-full ">
                      <p style={{ writingMode: 'vertical-lr' }}>
                        {item.code}
                      </p>
                    </span>
                    <span className="p-0">{item.description}</span>
                  </div>
                </li>
              ))
              : Array.from({ length: 6 })
                .fill(0)
                .map((_, index) => (
                  <li key={index}>
                    <span className=" h-[30px] bg-base-100 rounded"></span>
                  </li>
                ))}
          </ul>
          <div className='flex gap-2 w-full'>
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
              value={item.unit_size}
              type="text"
              labelText="U/M"
              name="unit_size"
              required
            />
          </div>
          <div className='flex gap-2 w-full'>
            <Input
              onChange={handleChangeItem}
              value={item.price}
              type="number"
              labelText="Precio"
              name="price"
              required
            />
            <Input
              value={item.cost}
              type="number"
              labelText="Costo"
              name="cost"
              disabled
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button type="submit" className="btn">
            Aceptar
          </button>
          <button onClick={onCloseModal} type="button" className="btn">
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ItemModal
