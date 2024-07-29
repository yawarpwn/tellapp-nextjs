import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useQuotationCreateStore } from '@/providers/quotation-create-store-provider'
import { type Product } from '@/types'
// import { useSearch } from '@/hooks/use-search'
import { useFuse } from '@/hooks/use-fuse'
import { XIcon } from '@/icons'
import { type QuotationItem } from '@/types'
import React, { useMemo } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  item?: QuotationItem
  onSubmit: (item: Omit<QuotationItem, 'id'>) => void
}

const initialQuoItem = {
  id: crypto.randomUUID(),
  price: 1,
  qty: 1,
  unit_size: '',
  description: '',
  cost: 1,
}

export function EditItemModal({ open, onClose, item, onSubmit }: Props) {
  const products = useQuotationCreateStore(state => state.products)

  const [quoItem, setQuoItem] = React.useState<QuotationItem>(
    item || initialQuoItem,
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

  const handleChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const canSearch = quoItem.description.length > 2

  const handleChangeSearch = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.currentTarget

    // if (canSearch) {
    onSearch(value)
    // }

    setQuoItem({
      ...quoItem,
      description: value,
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(quoItem)
    onClose()
  }

  const clearSearch = () => {
    setQuoItem({
      ...quoItem,
      description: '',
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="h-[98svh] max-w-sm p-2 md:max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="flex h-[93svh] flex-col gap-4">
          <div className="relative grid gap-2">
            {/* <Label htmlFor='description'>Descripcion</Label> */}
            {canSearch && (
              <Button
                type="button"
                onClick={clearSearch}
                size="icon"
                className="absolute right-0.5 top-0.5 z-40 size-6 bg-background"
              >
                <XIcon className="size-3.5" />
              </Button>
            )}
            <Textarea
              name="description"
              id="description"
              className="h-[80px] resize-none"
              value={quoItem.description}
              onChange={handleChangeSearch}
            />
          </div>
          <ul className="flex flex-col gap-2 overflow-y-auto">
            {hits.map(hit => (
              <li
                key={hit.refIndex}
                className="flex cursor-pointer"
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
                <div className="flex w-full items-center gap-x-2 overflow-hidden rounded-md p-0 hover:bg-zinc-800">
                  <div className="inline-flex h-full items-center bg-indigo-700 "></div>
                  <div className="p-1">
                    {hit.item.description}
                    <Badge className="ml-2">{hit.item.unitSize}</Badge>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex gap-4">
            <div className="grid gap-2">
              <label htmlFor="qty">Cantidad</label>
              <Input
                id="qty"
                name="qty"
                type="number"
                onChange={handleChangeItem}
                value={quoItem.qty}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="unit_size">Unidad/Medida</label>
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
            <div className="grid gap-2">
              <label htmlFor="price">Precio</label>
              <Input
                id="price"
                type="number"
                name="price"
                onChange={handleChangeItem}
                value={quoItem.price}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="cost">Costo</label>
              <Input
                id="cost"
                disabled
                name="cost"
                onChange={handleChangeItem}
                value={quoItem.cost}
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
