import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type Product } from '@/types'
import { useFuse } from '@/hooks/use-fuse'
import { type QuotationItem } from '@/types'
import React, { useState } from 'react'
import { cn, formatNumberToLocal } from '@/lib/utils'
import { EmpetyIcon, SearchIcon } from '@/icons'

function EmpetyHits() {
  return (
    <div className="flex h-full items-center justify-center ">
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-muted-foreground">Sin Resultados</h2>
        <span className="text-muted">
          <EmpetyIcon size={86} />
        </span>
      </div>
    </div>
  )
}

type Props = {
  open: boolean
  products: Product[]
  onClose: () => void
  item?: QuotationItem
  addItem: (item: Omit<QuotationItem, 'id'>) => void
  editItem: (id: string, item: Partial<QuotationItem>) => void
}

const initialQuoItem = {
  price: 0,
  qty: 0,
  unit_size: '',
  description: '',
  cost: 0,
  link: '',
}

export function CreateEditItemModal(props: Props) {
  const { open, onClose, item, addItem, editItem } = props
  const { products } = props
  const [quoItem, setQuoItem] = useState<Omit<QuotationItem, 'id'> | QuotationItem>(
    item ?? initialQuoItem,
  )

  const { hits, onSearch } = useFuse<Product>(products, {
    keys: [
      {
        name: 'code',
        weight: 2,
      },
      {
        name: 'description',
        weight: 1,
      },
    ],
  })

  const handleChangeItem = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget

    const updateValue =
      name === 'price' || name === 'qty' || name === 'cost' ? Number(value) : value

    setQuoItem({
      ...quoItem,
      [name]: updateValue,
    })
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    onSearch(value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    //edit
    if (item) {
      editItem(item.id, quoItem)
    } else {
      addItem(quoItem)
    }
    onClose()
  }

  const removeLink = () => {
    setQuoItem({
      ...quoItem,
      link: undefined,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle>Crear Item</DialogTitle>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'flex  max-w-md flex-col border p-2 py-4 md:p-6',
          hits.length === 0 ? 'h-auto' : 'h-[95svh] md:h-[90svh]',
        )}
      >
        {/* Search Product */}
        <header className="">
          <div className="flex h-9 w-full items-center rounded-md border pl-2">
            <SearchIcon className="text-muted" size={20} />
            <Input
              onChange={handleChangeSearch}
              className="border-none focus-visible:ring-0  "
              type="search"
              placeholder="Buscar producto"
            />
          </div>
        </header>
        {/* Items List */}
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {hits.length > 0 ? (
            hits.map(hit => (
              <button
                key={hit.item.id}
                className="flex flex-col gap-2 rounded-sm border bg-background p-2 hover:bg-muted"
                onClick={() => {
                  setQuoItem({
                    ...quoItem,
                    description: hit.item.description,
                    cost: hit.item.cost,
                    price: hit.item.price,
                    unit_size: hit.item.unitSize,
                    link: hit.item.link ? hit.item.link : '',
                    qty: 1,
                  })
                }}
              >
                <div className="line-clamp-2 text-left text-muted-foreground">
                  {hit.item.description}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="lowercase text-muted-foreground">
                    {hit.item.unitSize}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border border-secondary uppercase text-secondary"
                  >
                    {hit.item.code}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground">
                    {formatNumberToLocal(hit.item.price)}
                  </Badge>
                </div>
              </button>
            ))
          ) : (
            <EmpetyHits />
          )}
        </div>
        <div className="h-px w-full bg-muted"></div>

        {/* Inputs Products */}
        <footer>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Textarea
                name="description"
                id="description"
                className="h-[90px] resize-none  bg-muted p-2"
                value={quoItem.description}
                onChange={handleChangeItem}
              />
              {quoItem.link && (
                <button
                  type="button"
                  onClick={removeLink}
                  className="w-full pt-2 text-center text-xs text-primary underline"
                >
                  Quitar link de producto
                </button>
              )}
            </div>

            <div className="flex gap-4">
              <div className="grid w-full gap-2">
                <label className="text-xs text-muted-foreground" htmlFor="qty">
                  Cantidad
                </label>
                <Input
                  id="qty"
                  name="qty"
                  type="number"
                  onChange={handleChangeItem}
                  value={quoItem.qty}
                />
              </div>
              <div className="grid w-full gap-2">
                <label className="text-xs text-muted-foreground" htmlFor="unit_size">
                  Unidad/Medida
                </label>
                <Input
                  id="unit_size"
                  type="text"
                  name="unit_size"
                  onChange={handleChangeItem}
                  defaultValue={quoItem.unit_size}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="grid w-full gap-2">
                <label className="text-xs text-muted-foreground" htmlFor="price">
                  Precio
                </label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  onChange={handleChangeItem}
                  value={quoItem.price}
                />
              </div>
              <div className="grid w-full gap-2">
                <label className="text-xs text-muted-foreground" htmlFor="cost">
                  Costo
                </label>
                <Input
                  id="cost"
                  disabled
                  name="cost"
                  onChange={handleChangeItem}
                  value={quoItem.cost ?? ''}
                />
              </div>
            </div>
            <footer className="flex gap-2">
              <DialogClose asChild>
                <Button type="button" className="w-full">
                  Cancelar
                </Button>
              </DialogClose>
              <Button variant="secondary" className="w-full" type="submit">
                Aceptar
              </Button>
            </footer>
          </form>
        </footer>
      </DialogContent>
    </Dialog>
  )
}
