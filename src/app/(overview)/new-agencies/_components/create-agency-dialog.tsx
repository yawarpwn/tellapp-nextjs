'use client'

import { Input } from '@/components/ui/input'
import { getErrorMessage } from '@/lib/handle-error'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { createAgencyAction } from '@/lib/actions/agencies'
import { AgencyInsertSchema } from '@/schemas/agencies'

import { AddButton } from '@/components/buttons'
import type { AgencyInsert } from '@/types'

export function CreateAgencyDialog() {
  const [open, setOpen] = React.useState(false)
  const [isCreatePending, startCreateTransition] = React.useTransition()

  function onSubmit(input: AgencyInsert) {
    startCreateTransition(() => {
      toast.promise(createAgencyAction(input), {
        loading: 'Creando cliente...',
        success: () => {
          form.reset()
          setOpen(false)
          return 'Cliente Creado'
        },
        error: error => {
          setOpen(false)
          return getErrorMessage(error)
        },
      })
    })
  }

  const form = useForm<AgencyInsert>({
    resolver: zodResolver(AgencyInsertSchema),
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AddButton />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Agencia</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razon Social</FormLabel>
                  <FormControl>
                    <Input placeholder="nombre de cliente" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ruc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ruc</FormLabel>
                  <FormControl>
                    <Input placeholder="20610555536" {...field} />
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
                    <Input placeholder="Direccion" {...field} />
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
                    <Input placeholder="Telefono" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-row gap-2 pt-2 sm:space-x-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" variant="primary" className="w-full" disabled={isCreatePending}>
                Crear
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
