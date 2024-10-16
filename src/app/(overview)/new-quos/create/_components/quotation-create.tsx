'use client'

import { CustomerPickerDialog } from '../../_components/customer-picker-dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useQuotationCreateStore } from '@/providers/quotation-create-store-provider'
import { SearchIcon, StartIcon } from '@/icons'
import { createQuotationAction, searchRucAction } from '@/lib/actions/quoatations'
import { shootCoffeti } from '@/lib/confetti'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { QuotationItems } from '../../_components/quotation-item'

export function QuotationCreate() {
  const quo = useQuotationCreateStore(state => state.quo)
  const setQuo = useQuotationCreateStore(state => state.setQuo)
  const items = useQuotationCreateStore(state => state.items)

  const customers = useQuotationCreateStore(state => state.customers)
  const onPickCustomer = useQuotationCreateStore(state => state.onPickCustomer)
  const duplicateItem = useQuotationCreateStore(state => state.duplicateItem)
  const setItems = useQuotationCreateStore(state => state.setItems)
  const editItem = useQuotationCreateStore(state => state.editItem)
  const deleteItem = useQuotationCreateStore(state => state.deleteItem)
  const addItem = useQuotationCreateStore(state => state.addItem)
  const products = useQuotationCreateStore(state => state.products)

  const [pending, startTransition] = React.useTransition()
  const [pendingRuc, startTransitionRuc] = React.useTransition()
  const [showCreditOption, setShowCreditOption] = React.useState(false)

  const router = useRouter()
  const hastItems = items.length > 0

  const handleSubmit = () => {
    if (!hastItems) {
      toast.error('Debe agregar al menos un Producto')
      return
    }
    startTransition(async () => {
      // Insert Quotation
      toast.promise(createQuotationAction(quo, items), {
        loading: 'Creando...',
        success: ({ number }: { number: number }) => {
          shootCoffeti()
          router.push(`/new-quos/${number}`)

          return <p>Cotizacion Creado correctamente</p>
        },
        error: 'Error creando cotizacion',
      })
    })
  }

  // Manjedor para buscar cliente por Ruc
  const handleRucBlur = async () => {
    const ruc = quo.ruc

    if (!ruc) {
      toast.warning('Ingresa un ruc válido')
      return
    }

    if (ruc.length !== 11) {
      toast.warning('Ingresa  un Ruc de 11 digitos')
      return
    }

    startTransitionRuc(async () => {
      toast.promise(searchRucAction(ruc), {
        loading: 'Buscando ruc...',
        success: data => {
          if (data.customerIsFromDb) {
            setQuo({
              ...quo,
              company: data.company,
              address: data.address,
              isRegularCustomer: true,
              customerId: data.customerId,
            })
          } else {
            setQuo({
              ...quo,
              company: data.company,
              address: data.address,
              isRegularCustomer: false,
              customerId: null,
            })
          }

          return `Ruc ${quo.ruc} encontrado`
        },
        error: error => {
          return error.message
        },
      })
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setQuo({
      ...quo,
      [name]: value,
    })
  }

  return (
    <>
      <header className="flex justify-end">
        <div className="flex justify-end">
          <CustomerPickerDialog
            customers={customers}
            onCustomerPick={onPickCustomer}
            customerId={quo.customerId}
          />
        </div>
      </header>
      <article className="mt-4 flex flex-col gap-4 ">
        <div className="grid grid-cols-6 gap-3 md:gap-4">
          {/* Ruc  */}
          <div className="col-span-4 grid flex-grow gap-2 md:col-span-3">
            <Label htmlFor="ruc">Ruc</Label>
            <div className="relative">
              <Input
                required
                id="ruc"
                value={quo.ruc ?? ''}
                type="number"
                name="ruc"
                disabled={pendingRuc}
                onChange={handleInputChange}
              />
              <Button
                size="icon"
                type="button"
                onClick={handleRucBlur}
                className="absolute right-1.5 top-1 size-7"
                variant="secondary"
              >
                <SearchIcon className="size-4" />
              </Button>
            </div>
          </div>
          {/* Deadline  */}
          <div className="col-span-2 grid gap-2 md:col-span-3">
            <Label htmlFor="deadline">Entrega</Label>
            <Input
              className={quo?.deadline === 0 ? 'border border-destructive' : ''}
              required
              type="number"
              id="deadline"
              value={quo.deadline}
              disabled={pendingRuc}
              onChange={e => setQuo({ ...quo, deadline: Number(e.target.value) })}
            />
          </div>
          {/* Customer */}
          <div className="col-span-6 grid gap-2 md:col-span-3">
            <Label htmlFor="company">Cliente</Label>
            <Input
              id="company"
              name="company"
              type="text"
              value={quo.company ?? ''}
              disabled={pendingRuc}
              onChange={e => setQuo({ ...quo, company: e.target.value })}
            />
          </div>
          {/* Address */}
          <div className="col-span-6 grid gap-2 md:col-span-3">
            <Label htmlFor="company">Dirección</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={quo.address ?? ''}
              disabled={pendingRuc}
              onChange={e => setQuo({ ...quo, address: e.target.value })}
            />
          </div>

          {/* Include IGV */}
          <div className="col-span-3 flex items-center gap-2">
            <Checkbox
              id="includeIgv"
              onCheckedChange={e => setQuo({ ...quo, includeIgv: Boolean(e) })}
              checked={quo.includeIgv}
            />
            <Label htmlFor="includeIgv">Incluir IGV</Label>
          </div>

          {/* is Regular Customer */}
          <div className="col-span-3 flex w-full items-center justify-between">
            {quo.customerId && (
              <div
                className="flex 
                  items-center gap-2"
              >
                <StartIcon filled />
                <span className="text-sm">Cliente Atendido</span>
              </div>
            )}
          </div>

          {/*Credit */}
          <div className="col-span-3 flex h-9 items-center gap-2">
            <Switch
              checked={showCreditOption}
              onCheckedChange={checked => setShowCreditOption(checked)}
            />
            <Label htmlFor="credit">Pago a Credito?</Label>
          </div>
          {showCreditOption && (
            <div className="flex items-center gap-2">
              <Input
                id="credit"
                name="credit"
                type="number"
                className="w-32 grow"
                value={quo.credit ?? ''}
                placeholder="30"
                onChange={e => {
                  const { value } = e.target
                  const credit = value ? Number(value) : null
                  setQuo({ ...quo, credit })
                }}
              />
              <span>Días</span>
            </div>
          )}
        </div>

        <QuotationItems
          products={products}
          addItem={addItem}
          items={items}
          editItem={editItem}
          deleteItem={deleteItem}
          duplicateItem={duplicateItem}
          setItems={setItems}
        />
        <footer className="flex items-center justify-between">
          <Button disabled={pending} type="button" className="px-12" asChild>
            <Link href="/new-quos">Cancelar</Link>
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            className="px-12"
            disabled={pending || !hastItems || quo.deadline === 0}
            type="submit"
          >
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Crear
          </Button>
        </footer>
      </article>
    </>
  )
}
