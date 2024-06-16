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
import { SearchIcon } from '@/icons'
import { insertQuotation, setQuotation } from '@/lib/actions/quoatations'
import { shootCoffeti } from '@/lib/confetti'
import { getDni, getRuc } from '@/lib/sunat'
import { shouldAutoRemoveFilter } from '@tanstack/react-table'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { QuotationAddItems } from './add-items'

export function QuotationCustomerInfo() {
  const [loading, setLoading] = React.useState(false)
  const quo = useQuotationContext(state => state.quo)
  const setQuo = useQuotationContext(state => state.setQuo)
  const items = useQuotationContext(state => state.items)
  const isUpdate = useQuotationContext(state => state.isUpdate)
  const [pending, startTransition] = React.useTransition()
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
        toast.promise(() => setQuotation(quo, items), {
          loading: 'Actualizando...',
          success: ([error, data]) => {
            if (error) throw new Error('Error Update')
            if (!data) return
            store?.persist.clearStorage()
            router.push(`/new-quos/${data.number}`)

            return <p>Cotizacion {data.number} Actualizando correctamente</p>
          },
          error: 'Error Actualizando cotizacion',
        })
      } else {
        // Insert Quotation
        toast.promise(
          () =>
            insertQuotation(
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
            loading: 'Creando',
            success: ([error, data]) => {
              if (error) throw new Error('Error creando Cotizacion')
              if (!data) return
              store?.persist.clearStorage()
              shootCoffeti()
              router.push(`/new-quos/${data.number}`)

              return <p>Cotizacion {data.number} Creado correctamente</p>
            },
            error: 'Error creando',
          },
        )
      }
    })
  }

  // Manjedor para buscar cliente por Ruc
  const handleRucBlur = async () => {
    const dniRuc = quo.ruc
    console.log(dniRuc)

    if (!dniRuc) return

    if (dniRuc.length !== 8 && dniRuc.length !== 11) {
      toast.warning('Ingresa un dni o ruc válido')
      return
    }

    if (dniRuc.length === 8) {
      console.log('is Dni')

      setLoading(true)
      toast.promise(getDni(dniRuc), {
        loading: 'Buscando DNI...',
        success: ([error, data]) => {
          if (error) throw error

          if (!data) {
            throw new Error('No se encontro el ruc')
          }

          setQuo({
            ...quo,
            company: data.company,
            address: data.address,
          })
          setLoading(false)
          return 'Dni encontrado con exito'
        },
        error: () => {
          setLoading(false)
          return 'Error al buscar DNI'
        },
      })
    }

    if (dniRuc.length === 11) {
      console.log('isRuc')

      setLoading(true)
      toast.promise(getRuc(dniRuc), {
        loading: 'Buscando ruc...',
        success: ([error, data]) => {
          if (error) throw error

          if (!data) {
            throw new Error('No se encontro el ruc')
          }
          setLoading(false)
          setQuo({
            ...quo,
            company: data.company,
            address: data.address,
          })
          return 'Ruc encontrado'
        },
        error: () => {
          setLoading(false)
          return 'Error al buscar Ruc'
        },
      })
    }
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
                disabled={loading}
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
              disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
            onChange={e => setQuo({ ...quo, address: e.target.value })}
          />
        </div>
        <div className="flex h-6 items-center gap-4">
          <div className="flex items-start space-x-2 ">
            <Checkbox
              id="include_igv"
              onCheckedChange={e => setQuo({ ...quo, include_igv: Boolean(e) })}
              checked={quo.include_igv}
            />
            <Label htmlFor="include_igv">Incluir IGV</Label>
          </div>
          <div className="flex items-start space-x-2 ">
            <Checkbox
              id="is_regular_customer"
              checked={quo.is_regular_customer}
              onCheckedChange={e =>
                setQuo({ ...quo, is_regular_customer: Boolean(e) })
              }
            />
            <Label htmlFor="is_regular_customer">Cliente frecuente</Label>
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
