'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { updateLabelAction } from '@/lib/actions/labels'
import { useLabels } from '@/providers/labels-provider'
import { LabelUpdateSchema } from '@/schemas/labels'
import type { Label, LabelUpdate } from '@/types'
import { ChevronDown } from 'lucide-react'
import { PickAgencyDialog } from './pick-agency-dialog'
import { Textarea } from '@/components/ui/textarea'

interface UpdateTaskSheetProps extends React.ComponentPropsWithRef<typeof Sheet> {
  label: Label
}

export function UpdateLabelSheet({ label, onOpenChange, ...props }: UpdateTaskSheetProps) {
  const [isUpdatePending, startUpdateTransition] = useTransition()
  const { agencies } = useLabels()

  const form = useForm<LabelUpdate>({
    resolver: zodResolver(LabelUpdateSchema),
    defaultValues: {
      destination: label.destination,
      agencyId: label.agencyId,
      dniRuc: label.dniRuc,
      phone: label.phone,
      address: label.address,
      recipient: label.recipient,
      observations: label.observations,
    },
  })

  function onSubmit(input: LabelUpdate) {
    startUpdateTransition(() => {
      toast.promise(updateLabelAction(label.id, input), {
        loading: 'Actualizando...',
        success: () => {
          onOpenChange?.(false)
          return 'Actualizacion con exito'
        },
        error: () => {
          // return getErrorMessage(error)
          return 'Error al Actualizar'
        },
      })
    })
  }

  return (
    <Sheet onOpenChange={onOpenChange} {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Actualizar</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="dniRuc"
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
              name="agencyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agencia Sugerida</FormLabel>
                  <PickAgencyDialog
                    onPickAgency={agencyId => {
                      form.setValue('agencyId', agencyId)
                    }}
                    agencyId={field.value}
                    agencies={agencies}
                  />
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
                    <Input {...field} value={field.value ?? ''} />
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
                    <Input {...field} value={field.value ?? ''} />
                  </FormControl>
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
                    <Textarea {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="flex flex-row gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit" className="w-full" variant="primary" disabled={isUpdatePending}>
                Actualizar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
