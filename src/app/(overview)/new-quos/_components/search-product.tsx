import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useQuotationCreateStore } from '@/providers/quotation-create-store-provider'
import { SearchIcon } from '@/icons'
import { Checkbox } from '@radix-ui/react-checkbox'
import React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useSearch } from '@/hooks/use-search'

export function QuotationSearchProduct() {
  const products = useQuotationCreateStore(state => state.products)
  const addItem = useQuotationCreateStore(state => state.addItem)
  const [selectedProductId, setSelectedProductId] = React.useState<
    string | null
  >(null)
  const [open, setOpen] = React.useState<boolean>(false)

  const { results, searchValue, setSearchValue } = useSearch({
    dataSet: products,
    initialValue: 'fh',
    keys: ['code', 'description'],
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" type="button">
          <SearchIcon size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh]">
        <DialogHeader>
          <Input
            onChange={e => setSearchValue(e.target.value)}
            value={searchValue}
            type="search"
            placeholder="Ej. Fibra de ..."
            className="max-w-sm"
          />
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descripción</TableHead>
              <TableHead>Código</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Costo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map(product => (
              <TableRow
                key={product.id}
                className="hover:cursor-pointer hover:bg-foreground hover:text-background"
                onClick={() => {
                  addItem({
                    id: crypto.randomUUID(),
                    description: product.description,
                    cost: product.cost,
                    price: product.price,
                    unit_size: product.unit_size,
                    qty: 1,
                  })
                  setOpen(false)
                }}
              >
                <TableCell className="min-w-[250px]">
                  {product.description}
                </TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <form
          onSubmit={e => {
            e.preventDefault()
            const selectedProduct = products.find(
              product => product.id === selectedProductId,
            )

            if (!selectedProduct) return

            addItem({
              id: crypto.randomUUID(),
              description: selectedProduct.description,
              cost: selectedProduct.cost,
              price: selectedProduct.price,
              unit_size: selectedProduct.unit_size,
              qty: 1,
            })

            setSelectedProductId(null)
            setOpen(false)
          }}
        ></form>
      </DialogContent>
    </Dialog>
  )
}
