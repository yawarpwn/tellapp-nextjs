import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { type Product } from '@/types'
import { useFuse } from '@/hooks/use-fuse'
import { type QuotationItem } from '@/types'
import React, { useState } from 'react'
import { SearchIcon } from 'lucide-react'
import { formatNumberToLocal } from '@/lib/utils'

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

    if (name == 'price' || name == 'qty' || name == 'cost') {
      setQuoItem({
        ...quoItem,
        [name]: Number(value),
      })
    }

    setQuoItem({
      ...quoItem,
      [name]: value,
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="h-[100svh] border p-2 py-4 md:h-[90svh] md:p-6"
      >
        <div className="flex items-center rounded-md border pl-2">
          <SearchIcon size={20} />
          <Input
            onChange={handleChangeSearch}
            className="border-none focus-visible:ring-0  "
            type="search"
            placeholder="Buscar producto"
          />
        </div>
        {/* Items List */}
        <div className="flex flex-col gap-2 overflow-y-auto">
          {hits.map(hit => (
            <button
              key={hit.refIndex}
              className="flex flex-col gap-2 rounded-sm border bg-background p-2 hover:bg-muted"
              onClick={() => {
                setQuoItem({
                  ...quoItem,
                  description: hit.item.description,
                  cost: hit.item.cost,
                  price: hit.item.price,
                  unit_size: hit.item.unitSize,
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
                <Badge variant="outline" className="bg-muted uppercase text-muted-foreground">
                  {hit.item.code}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {formatNumberToLocal(hit.item.price)}
                </Badge>
              </div>
            </button>
          ))}
        </div>
        <div className="h-px w-full bg-muted"></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Textarea
            name="description"
            id="description"
            className="h-[90px] resize-none  bg-muted p-2"
            value={quoItem.description}
            onChange={handleChangeItem}
          />
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
      </DialogContent>
    </Dialog>
  )
}
