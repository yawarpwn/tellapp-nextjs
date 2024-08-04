'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/icons'
import { getErrorMessage } from '@/lib/handle-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from '@radix-ui/react-icons'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { createLabelAction, searchByDniOrRuc } from '@/lib/actions/labels'
import { LabelInsertSchema } from '@/schemas/labels'
import type { LabelInsert } from '@/types'
import { useLabels } from '@/providers/labels-provider'
import { Textarea } from '@/components/ui/textarea'

export function CreateLabelDialog() {
  const [open, setOpen] = useState(false)
  const [isCreatePending, startCreateTransition] = useTransition()
  const [isSearchDniRucPending, startSearchDniRucTransition] = useTransition()
  const { agencies } = useLabels()

  const onSubmit = (input: LabelInsert) => {
    startCreateTransition(() => {
      toast.promise(createLabelAction(input), {
        loading: 'Creando etiqueta...',
        success: () => {
          form.reset
          setOpen(false)
          return 'Etiqueta creada'
        },
        error: error => {
          setOpen(false)
          return getErrorMessage(error)
        },
      })
    })
  }

  const form = useForm<LabelInsert>({
    resolver: zodResolver(LabelInsertSchema),
    defaultValues: {
      agencyId: undefined,
      recipient: '',
      destination: '',
      address: '',
      dniRuc: '',
      phone: '',
      observations: '',
    },
  })

  //Search company in server
  const searchCompany = async () => {
    const dniRuc = form.getValues('dniRuc')

    if (!dniRuc) {
      toast.warning('Ingresa un dni o ruc')
      return
    }

    if (dniRuc.length !== 8 && dniRuc.length !== 11) {
      toast.warning('Ingresa un dni o ruc válido')
      return
    }

    startSearchDniRucTransition(() => {
      toast.promise(searchByDniOrRuc(dniRuc), {
        loading: 'Buscando ...',
        success: data => {
          form.setValue('recipient', data.company)
          form.setFocus('destination')
          return `Ruc ${data.company} encontrado`
        },
        error: error => {
          return error.message
        },
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm">
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Crear
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Rotulo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="dniRuc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dni/Ruc</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="number" disabled={isSearchDniRucPending} {...field} />
                      <Button
                        onClick={searchCompany}
                        size="icon"
                        type="button"
                        variant="secondary"
                        className="absolute right-0 top-0 h-full w-8"
                      >
                        <SearchIcon className="size-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destinatario</FormLabel>
                  <FormControl>
                    <Input disabled={isCreatePending || isSearchDniRucPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destino</FormLabel>
                  <FormControl>
                    <Input disabled={isCreatePending || isSearchDniRucPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefono</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isCreatePending || isSearchDniRucPending}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isCreatePending || isSearchDniRucPending}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agencyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agencia Sugerida</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Seleciona una agencia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {agencies.map(agency => (
                          <SelectItem
                            disabled={isCreatePending || isSearchDniRucPending}
                            key={agency.id}
                            value={agency.id}
                            className="capitalize"
                          >
                            {agency.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isSearchDniRucPending}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button
                  disabled={isCreatePending || isSearchDniRucPending}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                variant="primary"
                disabled={isCreatePending || isSearchDniRucPending}
              >
                Crear
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
