import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { useSearch } from '@/hooks/use-search'
import { XIcon } from '@/icons'
import { type QuotationItemType } from '@/types'
import React from 'react'

type Props = {
  open: boolean
  onClose: () => void
  item?: QuotationItemType
  onSubmit: (item: Omit<QuotationItemType, 'id'>) => void
}

const initialQuoItem = {
  price: 0,
  qty: 0,
  unit_size: '',
  description: '',
  cost: 0,
}

export function EditItemModal({ open, onClose, item, onSubmit }: Props) {
  const products = useQuotationContext(state => state.products)

  const [quoItem, setQuoItem] = React.useState<typeof initialQuoItem>(
    item || initialQuoItem,
  )

  const { results, searchValue, setSearchValue } = useSearch({
    dataSet: products,
    keys: ['code', 'description'],
  })

  const handleChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget

    if (name == 'price' || name == 'qty') {
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
    setSearchValue(value)
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
        className='max-w-sm md:max-w-3xl h-[98svh]'
      >
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 h-[93svh]'
        >
          <div className='grid gap-2 relative'>
            {/* <Label htmlFor='description'>Descripcion</Label> */}
            {canSearch && (
              <Button
                type='button'
                onClick={clearSearch}
                size='icon'
                className='absolute bg-background z-40 size-6 right-0.5 top-0.5'
              >
                <XIcon className='size-3.5' />
              </Button>
            )}
            <Textarea
              name='description'
              id='description'
              className='h-[100px] resize-none'
              value={quoItem.description}
              onChange={handleChangeSearch}
            />
          </div>
          <ul className='flex flex-col gap-2 overflow-y-auto'>
            {results.map(product => (
              <li
                key={product.id}
                onClick={() => {
                  setQuoItem({
                    ...quoItem,
                    description: product.description,
                    cost: product.cost,
                    price: product.price,
                    unit_size: product.unit_size,
                    qty: 1,
                  })
                }}
              >
                <div className='grid grid-cols-[60px_1fr] items-center gap-2 hover:bg-zinc-800 hover:text-white rounded-md px-1 py-1'>
                  <Badge variant='secondary' className='text-[10px] uppercase px-1 justify-center'>
                    {product.code}
                  </Badge>
                  <p className='text-sm'>
                    {product.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className='flex gap-4'>

            <div className='grid gap-2'>
              <label htmlFor='qty'>Cantidad</label>
              <Input
                id='qty'
                name='qty'
                type='number'
                onChange={handleChangeItem}
                value={quoItem.qty}
              />
            </div>
            <div className='grid gap-2'>
              <label htmlFor='unit_size'>Unidad/Medida</label>
              <Input
                id='unit_size'
                type='text'
                name='unit_size'
                onChange={handleChangeItem}
                defaultValue={quoItem.unit_size}
              />
            </div>
          </div>
          <div className='flex gap-4'>

            <div className='grid gap-2'>
              <label htmlFor='price'>Precio</label>
              <Input
                id='price'
                type='number'
                name='price'
                onChange={handleChangeItem}
                value={quoItem.price}
              />
            </div>
            <div className='grid gap-2'>
              <label htmlFor='cost'>Costo</label>
              <Input
                id='cost'
                disabled
                name='cost'
                onChange={handleChangeItem}
                value={quoItem.cost}
              />
            </div>
          </div>
          <footer className='flex gap-2'>
            <DialogClose asChild>
              <Button type='button' className='w-full'>
                Cancelar
              </Button>
            </DialogClose>
            <Button variant='secondary' className='w-full' type='submit'>
              Aceptar
            </Button>
          </footer>
        </form>
      </DialogContent>
    </Dialog>
  )
}
