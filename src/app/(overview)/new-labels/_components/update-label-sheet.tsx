'use client'

import { TABLES } from '@/constants'
import { createBrowserClient } from '@/lib/supabase/client'
import { Agency } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

// import { getErrorMessage } from "@/lib/handle-error"
import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { updateLabelAction } from '@/lib/actions/labels'
import { labelUpdateSchema } from '@/schemas/labels'
import type { LabelType, LabelUpdateType } from '@/types'

interface UpdateTaskSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  label: LabelType
}

export function UpdateLabelSheet({ label, onOpenChange, ...props }: UpdateTaskSheetProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition()

  const [agencies, setAgencies] = React.useState<Agency[]>([])

  const suggestedAgency = label.agency_id
    ? agencies.find(agency => agency.id === label.agency_id)
    : null

  console.log(suggestedAgency?.company)

  React.useEffect(() => {
    const supabase = createBrowserClient()
    supabase
      .from(TABLES.Agencies)
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.log(error)
        } else {
          setAgencies(data)
        }
      })
  }, [])

  const form = useForm<LabelUpdateType>({
    resolver: zodResolver(labelUpdateSchema),
    defaultValues: {
      destination: label.destination,
      dni_ruc: label.dni_ruc,
      phone: label.phone,
      address: label.address,
      recipient: label.recipient,
    },
  })

  function onSubmit(input: LabelUpdateType) {
    startUpdateTransition(() => {
      toast.promise(
        updateLabelAction({
          id: label.id,
          ...input,
        }),
        {
          loading: 'Actualizando...',
          success: () => {
            onOpenChange?.(false)
            return 'Actualizacion con exito'
          },
          error: () => {
            onOpenChange?.(false)
            // return getErrorMessage(error)
            return 'Error al Actualizar'
          },
        },
      )
    })
  }

  return (
    <Sheet onOpenChange={onOpenChange} {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Actualizar</SheetTitle>
          <SheetDescription>Completa el formulario para actualizar</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="dni_ruc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dni/Ruc</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="agency_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agencia Sugerida</FormLabel>
                  <Select
                    defaultValue={suggestedAgency?.company ?? ''}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Seleciona una categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-[380px]">
                      <SelectGroup>
                        {Object.values(agencies).map(agency => (
                          <SelectItem key={agency.id} value={agency.id} className="capitalize">
                            {agency.company}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button disabled={isUpdatePending}>Actualizar</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
