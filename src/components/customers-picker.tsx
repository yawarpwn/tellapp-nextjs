'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import InputSearch from './input-search'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useQuotationCreateStore } from '@/providers/quotation-create-store-provider'

export function CustomersPicker() {
  const [open, setOpen] = React.useState(false)

  const [filterValue, setFilterValue] = React.useState('')
  const customers = useQuotationCreateStore(state => state.customers)
  const onPickCustomer = useQuotationCreateStore(state => state.onPickCustomer)

  const filteredCustomers = React.useMemo(() => {
    if (!filterValue) return customers

    return customers.filter(customer => {
      return customer.name.toLowerCase().includes(filterValue.toLowerCase())
    })
  }, [filterValue, customers])

  const closeModal = () => setOpen(false)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setFilterValue(value)
  }

  return (
    <section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={'secondary'}>Clientes Frecuentes</Button>
        </DialogTrigger>
        {open && (
          <DialogContent className="h-[90vh]">
            <DialogHeader>
              <InputSearch
                searchValue={filterValue}
                placeholder={'Buscar cliente...'}
                onSearchChange={handleSearchChange}
              />
            </DialogHeader>
            <ul className="flex h-auto flex-col overflow-y-auto">
              {filteredCustomers.length > 0 &&
                filteredCustomers.map(item => {
                  return (
                    <li
                      key={item.id}
                      onClick={() => {
                        onPickCustomer({
                          ...item,
                          address: item.address || '',
                        })
                        closeModal()
                      }}
                      className="flex cursor-pointer items-center gap-2 px-2 py-2 hover:bg-foreground hover:text-background"
                    >
                      <p className="text-sm">{item.name}</p>
                    </li>
                  )
                })}
            </ul>
          </DialogContent>
        )}
      </Dialog>
    </section>
  )
}
