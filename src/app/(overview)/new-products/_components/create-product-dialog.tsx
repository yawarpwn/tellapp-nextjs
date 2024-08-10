'use client'

import { Input } from '@/components/ui/input'
import { PRODUCT_CATEGORIES } from '@/constants'
import type { ProductInsert } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { getErrorMessage } from '@/lib/handle-error'

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { createProductAction } from '@/lib/actions/products'

import { ProductInsertSchema } from '@/schemas/products'
import { AddButton } from '@/components/buttons'

export function CreateProductDialog() {
  const [open, setOpen] = React.useState(false)
  const [isCreatePending, startCreateTransition] = React.useTransition()

  function onSubmit(input: ProductInsert) {
    console.log('submit')
    startCreateTransition(() => {
      toast.promise(createProductAction(input), {
        loading: 'Creando producto...',
        success: () => {
          form.reset()
          setOpen(false)
          return 'Producto Creado'
        },
        error: error => {
          return getErrorMessage(error)
        },
      })
    })
  }

  const form = useForm<ProductInsert>({
    resolver: zodResolver(ProductInsertSchema),
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AddButton />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Producto</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripcion de producto..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo</FormLabel>
                  <FormControl>
                    <Input className="uppercase" placeholder="FHIP-123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unitSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidad / Medida</FormLabel>
                  <FormControl>
                    <Input placeholder="120x60cm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enlace de producto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://tellsenales.com/enlace-producto"
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Costo</FormLabel>
                    <FormControl>
                      <Input placeholder="90" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input placeholder="100" {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Seleciona una categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {Object.values(PRODUCT_CATEGORIES).map(item => (
                          <SelectItem key={item} value={item} className="capitalize">
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
              <Button variant="primary" disabled={isCreatePending} className="w-full">
                Crear
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
