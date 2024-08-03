'use client'

import type { CustomerType } from '@/types'
import React from 'react'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { deleteCustomerAction } from '@/lib/actions/customers'
import { MoreHorizontal } from 'lucide-react'
import { UpdateCustomerSheet } from './update-customer-sheet'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<CustomerType>()

export const customerColumns = [
  columnHelper.accessor('name', {
    header: 'Cliente',
    cell: props => (
      <div className="min-w-[250px]">
        <p>{props.getValue()}</p>
        <p className="text-sm text-muted-foreground">{props.row.original.address}</p>
      </div>
    ),
  }),
  columnHelper.accessor('ruc', {
    header: 'Ruc',
    cell: props => props.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    cell: function Cell({ row }) {
      const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
      const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)

      return (
        <DropdownMenu>
          {showUpdateDialog && (
            <UpdateCustomerSheet
              open={showUpdateDialog}
              onOpenChange={setShowUpdateDialog}
              customer={row.original}
            />
          )}
          <ConfirmActionDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            action={() => deleteCustomerAction(row.original.id)}
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
            <DropdownMenuItem onSelect={() => setShowUpdateDialog(true)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>Borrar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
]
