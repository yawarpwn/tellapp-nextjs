'use client'

import type { Signal } from '@/types'
import React from 'react'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { deleteSignalAction } from '@/lib/actions/signals'
import { MoreHorizontal } from 'lucide-react'
// import { UpdateCustomerSheet } from './update-customer-sheet'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<Signal>()

export const signalsColumns = [
  columnHelper.accessor('url', {
    cell: props => {
      return (
        <div className="size-40 overflow-hidden">
          <img className="h-full w-full object-cover" src={props.row.original.thumbUrl} />
        </div>
      )
    },
  }),
  columnHelper.accessor('title', {
    header: 'Titulo',
    cell: props => (
      <div className="min-w-[250px]">
        <p>{props.getValue()}</p>
      </div>
    ),
  }),

  columnHelper.accessor('code', {
    header: 'Código',
    cell: props => (
      <div className="">
        <p>{props.getValue()}</p>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'actions',
    cell: function Cell({ row }) {
      const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
      const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)

      return (
        <DropdownMenu>
          {/* {showUpdateDialog && ( */}
          {/*   <UpdateCustomerSheet */}
          {/*     open={showUpdateDialog} */}
          {/*     onOpenChange={setShowUpdateDialog} */}
          {/*     customer={row.original} */}
          {/*   /> */}
          {/* )} */}
          <ConfirmActionDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            action={() => deleteSignalAction(row.original.id)}
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
