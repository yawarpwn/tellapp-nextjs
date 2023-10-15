'use client'
import { useRef, useState, useEffect } from 'react'
import Input from '@/components/input'
import Modal from '@/components/modal'
import { PlusIcon, UpdateIcon } from '@/icons'
import { createSearchInstance } from '@/services/search'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const initialState = {
  qty: 0,
  price: 0,
  unit_size: '',
  description: '',
}

function ItemModal({
  modalRef,
  onCloseModal,
  onAddItem,
  onEditItem,
  editingItem,
}) {
  const [item, setItem] = useState(initialState)
  const searchInstance = useRef(null)
  const [results, setResults] = useState([])
  // const [products, setProducts] = useState([])

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

  const handleSearchProduct = (event, index) => {
    const { value } = event.target
    setItem(prev => ({ ...prev, description: value }))
    const searchResult = searchInstance?.current.search(item.description)
    const searchResultMapped = searchResult?.map(({ item }) => item)
    setResults(searchResultMapped)
    console.log('searchResult', searchResultMapped)
  }

  const handleChangeItem = event => {
    let { value, name } = event.target

    if (name === 'qty' || name === 'price') {
      value = Number(value)
    }

    setItem(prev => ({ ...prev, [name]: value }))
  }

  const searchInputRef = useRef()
  const qtyInputRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()

    // Si Es edicion
    if (editingItem) {
      console.log('editing item')
      onEditItem(item)
      setItem(() => initialState)
      onCloseModal()
    } else {
      //Si es nuevo
      const id = crypto.randomUUID()
      const newItem = {
        ...item,
        id,
      }

      onAddItem(newItem)
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
        qty: 1,
      })
    } else {
      setItem({
        ...item,
        unit_size: product.unit_size,
        description: product.description,
      })
    }
    qtyInputRef?.current.focus()
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
                autoFocus
                className="textarea w-full resize-none h-[120px]"
                ref={searchInputRef}
                onChange={handleSearchProduct}
                value={item.description}
                name="description"
                required
              />
            </div>
            <div className="results">
              <ul className="menu bg-base-200 flex-nowrap gap-4  rounded-box h-[300px] overflow-y-auto">
                {results.length > 0 ? (
                  results.map(item => (
                    <li
                      onClick={() => handleProductClick(item)}
                      className="hover:text-warning cursor-pointer"
                      key={item.id}
                    >
                      {item.description}
                    </li>
                  ))
                ) : (
                  Array.from({ length: 6 }).fill(0).map((_, index) => (
                      <li className='w-[350px] bg-base-200-[15px]' key={index}></li>
                    ))
                )}
              </ul>
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
                inputRef={qtyInputRef}
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
              {editingItem ? (
                <>
                  <UpdateIcon />
                  Actualizar
                </>
              ) : (
                <>
                  <PlusIcon /> Agregar
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default ItemModal
