'use client'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { setIsRegularCustomerAction } from '@/lib/actions/customers'
import { StartIcon } from '@/icons'
import { deleteQuotationAction, duplicateQuotationAction } from '@/lib/actions/quoatations'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

import { formatDateToLocal, getFormatedDate, getIgv } from '@/lib/utils'
import { type QuotationClient } from '@/types'
import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

export function getColumns(): ColumnDef<QuotationClient>[] {
  return [
    {
      id: 'regular-customer',

      cell: function Cell({ row }) {
        const [optimisticState, updateOptimistic] = React.useState(row.original.isRegularCustomer)

        if (!row.original.customerId) return null
        return (
          <form
            action={async (formData: FormData) => {
              const id = formData.get('id') as string
              updateOptimistic(!optimisticState)
              await setIsRegularCustomerAction({
                id,
                value: !optimisticState,
              })
            }}
          >
            <input type="hidden" name="id" value={row.original.customerId} />
            <button type="submit">
              {optimisticState ? (
                <StartIcon filled className="size-4" />
              ) : (
                <StartIcon className="size-4" />
              )}
            </button>
          </form>
        )
      },
    },
    {
      header: 'Nro',
      accessorKey: 'number',
      enableGlobalFilter: true,
      filterFn: 'inNumberRange',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <span>{row.original.number}</span>
        </div>
      ),
    },
    {
      accessorKey: 'company',
      // accessorFn: row => row.company,
      header: 'Cliente',
      cell: ({ row }) => (
        <div>
          <p className="min-w-[230px]">{row.original.company || 'SIN RUC'}</p>
          <p>{row.original.ruc}</p>
        </div>
      ),
    },
    {
      header: 'Monto',
      cell: ({ row }) => getIgv(row.original.items).formatedTotal,
      enableGlobalFilter: false,
    },
    {
      header: 'Fecha',
      cell: ({ row }) => (
        <div className="w-[max-content]">
          {formatDateToLocal(row.original.createdAt, {
            month: 'short',
          })}
        </div>
      ),
      enableGlobalFilter: false,
    },
    {
      header: 'Estado',
      accessorKey: 'isPaymentPending',
      cell: ({ row }) => (
        <div className="w-[max-content]">
          {row.original.isPaymentPending ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/50">Pendiente</span>
              <span className="flex size-2 rounded-full bg-yellow-400"></span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/50">Pagado</span>
              <span className="flex size-2 rounded-full bg-green-400"></span>
            </div>
          )}
        </div>
      ),
      enableGlobalFilter: false,
    },
    {
      id: 'actions',
      cell: function Cell({ row }) {
        const [showDeleteModal, setShowDeleteModal] = React.useState(false)
        const openDeleteModal = () => setShowDeleteModal(true)

        return (
          <DropdownMenu>
            <ConfirmActionDialog
              action={() => deleteQuotationAction(row.original.id)}
              dialogTitle={
                <>
                  ¿Deseas borrar la cotización{' '}
                  <span className="font-bold text-accent">#{row.original.number}</span>
                </>
              }
              open={showDeleteModal}
              onOpenChange={setShowDeleteModal}
              showTrigger={false}
            />
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/new-quos/${row.original.number}`}>Ver</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/new-quos/${row.original.number}/update`}>Editar</Link>
              </DropdownMenuItem>
              {/* <DropdownMenuItem onSelect={openDeleteModal}> */}
              {/*   Borrar */}
              {/* </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
