'use client'

import { CustomersPicker } from '@/components/customers-picker'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  useQuotationContext,
  useQuotationStore,
} from '@/hooks/use-quotation-store'
import { SearchIcon, StartIcon } from '@/icons'
import {
  createQuotationAction,
  searchRucAction,
  updateQuotationAction,
} from '@/lib/actions/quoatations'
import { shootCoffeti } from '@/lib/confetti'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { QuotationAddItems } from './add-items'

export function QuotationCustomerInfo() {
  const quo = useQuotationContext(state => state.quo)
  const setQuo = useQuotationContext(state => state.setQuo)
  const items = useQuotationContext(state => state.items)
  const isUpdate = useQuotationContext(state => state.isUpdate)
  const isCustomerServed = useQuotationContext(state => state.isCustomerServed)
  const setIsCustomerServed = useQuotationContext(
    state => state.setIsCustomerServed,
  )
  const [pending, startTransition] = React.useTransition()
  const [pendingRuc, startTransitionRuc] = React.useTransition()
  const [showCreditOption, setShowCreditOption] = React.useState(false)
  const store = useQuotationStore()
  const router = useRouter()
  const hastItems = items.length > 0

  const handleSubmit = () => {
    if (!hastItems) {
      toast.error('Debe agregar al menos un Producto')
      return
    }
    startTransition(async () => {
      if ('id' in quo) {
        // Update Quotation
        toast.promise(() => updateQuotationAction(quo, items), {
          loading: 'Actualizando...',
          success: ({ number }) => {
            store?.persist.clearStorage()
            router.push(`/new-quos/${number}`)

            return <p>Cotizacion {number} Actualizando correctamente</p>
          },
          error: 'Error Actualizando cotizacion',
        })
      } else {
        // Insert Quotation
        toast.promise(
          () =>
            createQuotationAction(
              {
                ruc: quo.ruc,
                company: quo.company,
                address: quo.address,
                deadline: quo.deadline as number,
                include_igv: quo.include_igv as boolean,
                is_regular_customer: quo.is_regular_customer as boolean,
                credit: quo.credit,
              },
              items,
            ),
          {
            loading: 'Creando...',
            success: ({ number }: { number: number }) => {
              store?.persist.clearStorage()
              shootCoffeti()
              router.push(`/new-quos/${number}`)

              return <p>Cotizacion {number} Creado correctamente</p>
            },
            error: 'Error creando cotizacion',
          },
        )
      }
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
          setQuo({
            ...quo,
            company: data.company,
            address: data.address,
          })

          if (data.customerIsFromDb) {
            setIsCustomerServed()
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
          <CustomersPicker />
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
                id="include_igv"
                onCheckedChange={e =>
                  setQuo({ ...quo, include_igv: Boolean(e) })
                }
                checked={quo.include_igv}
              />
              <Label htmlFor="include_igv">Incluir IGV</Label>
            </div>

            {isCustomerServed && (
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
        <QuotationAddItems />
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
            {isUpdate ? 'Actualizar' : 'Crear'}
          </Button>
        </footer>
      </article>
    </>
  )
}
