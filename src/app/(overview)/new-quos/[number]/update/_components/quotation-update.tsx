'use client'

import { CustomersPicker } from '@/components/customers-picker'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useQuotationUpdateStore } from '@/providers/quotation-update-store-provider'
import { SearchIcon, StartIcon } from '@/icons'
import {
  updateQuotationAction,
  searchRucAction,
} from '@/lib/actions/quoatations'
import { shootCoffeti } from '@/lib/confetti'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { QuotationItems } from '../../../_components/quotation-item'

export function QuotationUpdate() {
  const quo = useQuotationUpdateStore(state => state.quo)
  const setQuo = useQuotationUpdateStore(state => state.setQuo)
  const items = useQuotationUpdateStore(state => state.items)
  const customers = useQuotationUpdateStore(state => state.customers)
  const onPickCustomer = useQuotationUpdateStore(state => state.onPickCustomer)
  const duplicateItem = useQuotationUpdateStore(state => state.duplicateItem)
  const setItems = useQuotationUpdateStore(state => state.setItems)
  const editItem = useQuotationUpdateStore(state => state.editItem)
  const deleteItem = useQuotationUpdateStore(state => state.deleteItem)
  const addItem = useQuotationUpdateStore(state => state.addItem)

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
      toast.promise(updateQuotationAction(quo, items), {
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
      <header className="flex justify-between">
        <div></div>
        <div className="flex justify-end">
          <CustomersPicker
            onPickCustomer={onPickCustomer}
            customers={customers}
          />
        </div>
      </header>
      <article className="mt-4 flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2 ">
          <div className="grid gap-2">
            <Label htmlFor="ruc">Ruc</Label>
            <div className="relative">
              <Input
                required
                id="ruc"
                value={quo.ruc ?? ''}
                type="text"
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
          <div className="grid gap-2">
            <Label htmlFor="deadline">Tiempo de entrega</Label>
            <Input
              className={quo?.deadline === 0 ? 'border border-destructive' : ''}
              required
              type="number"
              id="deadline"
              value={quo.deadline}
              disabled={pendingRuc}
              onChange={e =>
                setQuo({ ...quo, deadline: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="grid gap-2">
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

        <div className="grid gap-2">
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
        <div className="flex h-6 items-center gap-4">
          <div
            className="flex w-full items-center justify-between 
            "
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id="includeIgv"
                onCheckedChange={e =>
                  setQuo({ ...quo, includeIgv: Boolean(e) })
                }
                checked={quo.includeIgv}
              />
              <Label htmlFor="includeIgv">Incluir IGV</Label>
            </div>

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
        </div>

        <div className="grid h-6 grid-cols-2 items-center gap-2">
          <div className="flex items-center gap-2">
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
                className="w-20"
                value={quo.credit ?? ''}
                placeholder="7"
                onChange={e => {
                  const { value } = e.target
                  const credit = value ? Number(value) : null
                  setQuo({ ...quo, credit })
                }}
              />
              <span>Dias</span>
            </div>
          )}
        </div>
        <QuotationItems
          addItem={addItem}
          items={items}
          setItems={setItems}
          deleteItem={deleteItem}
          editItem={editItem}
          duplicateItem={duplicateItem}
        />
        <footer className="flex items-center justify-between">
          <Button disabled={pending} type="button" className="px-12" asChild>
            <Link href="/new-quos">Anterior</Link>
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
