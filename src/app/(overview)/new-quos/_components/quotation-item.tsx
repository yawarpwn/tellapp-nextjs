import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useQuotationCreateStore } from '@/providers/quotation-create-store-provider'
import { DeleteIcon, DocumentDuplicateIcon, EditIcon } from '@/icons'
import { getIgv } from '@/lib/utils'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { NoResult } from './no-result'

import { PlusIcon } from '@/icons'
import { QuotationItem } from '@/types'
import React, { useState } from 'react'
import { CreateEditItemModal } from './create-edit-item-modal'
export function QuotationItems() {
  //global states
  const items = useQuotationCreateStore(state => state.items)
  const duplicateItem = useQuotationCreateStore(state => state.duplicateItem)
  const setItems = useQuotationCreateStore(state => state.setItems)
  const editItem = useQuotationCreateStore(state => state.editItem)
  const deleteItem = useQuotationCreateStore(state => state.deleteItem)

  //Estados
  const [seletedProductId, setSelectedProductId] = useState<string | null>(null)
  const productItem = items.find(item => item.id == seletedProductId)
  const [open, setOpen] = useState(false)

  //functions
  const closeItemModal = () => setOpen(false)
  const move = (currentIndex: number, nextIndex: number) => {
    const newItems = [...items]
    newItems[currentIndex] = items[nextIndex]
    newItems[nextIndex] = items[currentIndex]
    setItems(newItems)
  }

  const moveUpItem = (index: number) => {
    if (index > 0) {
      move(index, index - 1)
    }
  }

  const moveDownItem = (index: number) => {
    if (index < items.length - 1) {
      move(index, index + 1)
    }
  }

  const onChangeValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: QuotationItem,
  ) => {
    const { name, value } = event.target
    if (name == 'price' || name == 'qty') {
      editItem(item.id, {
        [name]: Number(value),
      })
    } else {
      editItem(item.id, {
        [name]: value,
      })
    }
  }

  const { formatedIgv, formatedTotal, formatedSubTotal } = getIgv(items)

  return (
    <section>
      {open && (
        <CreateEditItemModal
          item={productItem}
          open={open}
          onClose={closeItemModal}
        />
      )}
      <header className="flex items-center justify-between py-4">
        <h2 className="text-xl font-bold ">Productos</h2>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => {
              setOpen(true)
              setSelectedProductId(null)
            }}
            variant={'secondary'}
          >
            <PlusIcon size={20} />
          </Button>
        </div>
      </header>
      {items.length > 0 ? (
        <div>
          <ul className="flex flex-col gap-4">
            {items.map((item, index) => (
              <li key={item.id}>
                <Card className="border-border">
                  <CardContent className="grid gap-4 p-4">
                    <div className="flex items-center justify-between [&_button]:size-7 [&_button]:shrink-0 [&_button_svg]:size-4 ">
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          size="icon"
                          onClick={() => moveUpItem(index)}
                        >
                          <ChevronUp />
                        </Button>
                        <Button size="icon" onClick={() => moveDownItem(index)}>
                          <ChevronDown />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button size="icon" onClick={() => duplicateItem(item)}>
                          <DocumentDuplicateIcon />
                        </Button>
                        <Button
                          size="icon"
                          onClick={() => {
                            setOpen(true)
                            setSelectedProductId(item.id)
                          }}
                        >
                          <EditIcon size={20} />
                        </Button>
                        <Button size="icon" onClick={() => deleteItem(item.id)}>
                          <DeleteIcon size={20} />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex-1">
                          <p className="text-sm">{item.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <input
                        className="col-span-4 rounded  border border-transparent bg-zinc-800 px-2 py-1 text-xs outline-none focus:border-primary"
                        type="text"
                        onChange={e => onChangeValue(e, item)}
                        name="unit_size"
                        value={item.unit_size}
                      />
                      <input
                        className="col-span-2 rounded border border-transparent bg-transparent bg-zinc-800 px-2 py-1 outline-none focus:border-primary"
                        type="number"
                        onChange={e => onChangeValue(e, item)}
                        name="qty"
                        value={item.qty}
                      />
                      <div className="col-span-3 flex items-center gap-1">
                        <span>S/</span>
                        <input
                          className="w-full rounded border border-transparent bg-zinc-800 px-2 py-1 outline-none focus:border-primary"
                          type="number"
                          onChange={e => onChangeValue(e, item)}
                          name="price"
                          value={item.price}
                        />
                      </div>
                      <span className="text-success col-span-3 rounded px-2 py-1">
                        S/ {item.price * item.qty}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex justify-start sm:flex sm:justify-end">
            <div className="w-full space-y-2 sm:w-auto sm:text-right">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-1 sm:gap-2">
                <dl className="grid gap-x-3 sm:grid-cols-5">
                  <dt className="col-span-3 font-semibold ">Subtotal:</dt>
                  <dd className="col-span-2 ">{formatedSubTotal}</dd>
                </dl>
                <dl className="grid gap-x-3 sm:grid-cols-5">
                  <dt className="col-span-3 font-semibold ">Igv:</dt>
                  <dd className="col-span-2 ">{formatedIgv}</dd>
                </dl>
                <dl className="grid gap-x-3 sm:grid-cols-5">
                  <dt className="col-span-3 font-semibold ">Total:</dt>
                  <dd className="col-span-2 ">{formatedTotal}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoResult />
      )}
    </section>
  )
}
