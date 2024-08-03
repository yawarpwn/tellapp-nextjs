'use client'

import { useSearch } from '@/hooks/use-search'
import { ProductType } from '@/types'
import { QuotationItem } from '@/types'
import { XIcon } from 'lucide-react'
import React from 'react'
import { Input } from './input'
import { Textarea } from './textarea'

interface Props {
  itemToEdit?: QuotationItem
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  closeModal: () => void
}

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useQuotationCreateStore } from '@/hooks/use-quotation-store'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { QuotationItemsSearch } from './items-search'

const initialState = {
  price: 0,
  qty: 0,
  description: '',
  cost: 0,
  unit_size: '',
}

export function QuotationItemModal() {
  // const { itemToEdit, open, onOpenChange, closeModal } = props
  // const [open, setOpen] = React.useState(false)
  const isItemModalOpen = useQuotationCreateStore(state => state.isItemModalOpen)
  const openItemModal = useQuotationCreateStore(state => state.openItemModal)
  const closeItemModal = useQuotationCreateStore(state => state.closeItemModal)
  const items = useQuotationCreateStore(state => state.items)
  const addItem = useQuotationCreateStore(state => state.addItem)
  const editItem = useQuotationCreateStore(state => state.editItem)
  const selectedIdItem = useQuotationCreateStore(state => state.selectedIdItem)
  const itemToEdit = items.find(item => item.id === selectedIdItem)
  const [item, setItem] = React.useState(itemToEdit || initialState)
  const products = useQuotationCreateStore(state => state.products)

  console.log({ isItemModalOpen, selectedIdItem, itemToEdit })

  const { results, setSearchValue } = useSearch({
    dataSet: products,
    keys: ['description', 'code'],
  })

  const isEditMode = !!itemToEdit
  // const closeModal = () => setOpen(false)

  const showClearDescription = item.description.length >= 3

  const handleChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = event.target.value
    const { name } = event.target

    if (name === 'qty' || name === 'price') {
      value = Number(value)
    }

    setItem(prev => ({ ...prev, [name]: value }))
  }

  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItem(prev => ({ ...prev, description: event.target.value }))
    setSearchValue(event.target.value)
  }

  const handleProductClick = (product: ProductType) => {
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
        cost: product.cost,
      })
    }
  }

  const clearDescription = () => {
    setItem(prev => ({
      ...prev,
      description: '',
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isEditMode) {
      editItem({
        id: itemToEdit.id,
        price: item.price,
        qty: item.qty,
        unit_size: item.unit_size,
        description: item.description,
        cost: item.cost,
      })
    } else {
      addItem({
        id: crypto.randomUUID(),
        price: item.price,
        qty: item.qty,
        unit_size: item.unit_size,
        description: item.description,
        cost: item.cost,
      })
    }
    closeItemModal()
  }

  return (
    <Dialog open={isItemModalOpen} onOpenChange={closeItemModal}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 ">
            <div className="relative">
              {showClearDescription && (
                <button
                  type="button"
                  onClick={clearDescription}
                  className="btn btn-circle btn-xs absolute right-2 top-12 z-10"
                >
                  <XIcon />
                </button>
              )}
              <QuotationItemsSearch />
              <Textarea
                labelText="Descripcion"
                autoFocus
                className="h-[120px]  w-full"
                placeholder="Buscar producto"
                onChange={handleSearch}
                value={item.description}
                name="description"
                required
              />
            </div>

            <ul className="menu bg-base-200 rounded-box h-[300px] w-full flex-nowrap  gap-4 overflow-y-auto bg-none">
              {results?.length > 0
                ? results.map(item => (
                    <li
                      onClick={() => handleProductClick(item)}
                      className="flex gap-x-1 "
                      key={item.id}
                    >
                      <div className="flex items-center gap-x-2 p-0">
                        <span className="btn btn-primary btn-xs h-full ">
                          <p style={{ writingMode: 'vertical-lr' }}>{item.code}</p>
                        </span>
                        <span className="p-0">{item.description}</span>
                      </div>
                    </li>
                  ))
                : Array.from({ length: 6 })
                    .fill(0)
                    .map((_, index) => (
                      <li key={index}>
                        <span className="skeleton h-[30px]"></span>
                      </li>
                    ))}
            </ul>
            <div className="flex w-full gap-2">
              <div className="w-full">
                <Input
                  onChange={handleChangeItem}
                  value={item.qty}
                  type="number"
                  labelText="Cantidad"
                  name="qty"
                  required
                />
              </div>
              <div className="w-full">
                <Input
                  onChange={handleChangeItem}
                  value={item.unit_size}
                  type="text"
                  labelText="U/M"
                  name="unit_size"
                  required
                />
              </div>
            </div>
            <div className="flex w-full gap-2">
              <div className="w-full">
                <Input
                  onChange={handleChangeItem}
                  value={item.price}
                  type="number"
                  labelText="Precio"
                  name="price"
                  required
                />
              </div>
              <div className="w-full">
                <Input value={item.cost} type="number" labelText="Costo" name="cost" disabled />
              </div>
            </div>
          </div>
          <footer className="mt-4 flex items-center gap-4 ">
            <button className="btn btn-secondary flex-1" type="submit">
              {isEditMode ? 'Actualizar' : 'Agregar'}
            </button>
            <button type="button" className="btn btn-secondary flex-1" onClick={closeItemModal}>
              Cancelar
            </button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  )
}
