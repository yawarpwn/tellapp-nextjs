'use client'

import type { Signal } from '@/types'
import React from 'react'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { deleteGalleryAction } from '@/lib/actions/gallery'
import { MoreHorizontal } from 'lucide-react'
import { UpdateGalleryDialog } from './update-gallery-sheet'

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

export const galleryColumns = [
  columnHelper.accessor('url', {
    header: 'foto',
    cell: props => {
      return (
        <div className="size-[100px] overflow-hidden">
          <img className="h-full w-full object-contain" src={props.row.original.thumbUrl} />
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

  columnHelper.accessor('category', {
    header: 'Categoria',
    cell: props => <p>{props.getValue()}</p>,
  }),

  columnHelper.accessor('width', {
    header: 'Ancho (px)',
    cell: props => <p>{props.getValue()}</p>,
  }),

  columnHelper.accessor('height', {
    header: 'Alto (px)',
    cell: props => <p>{props.getValue()}</p>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: function Cell({ row }) {
      const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
      const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)

      return (
        <DropdownMenu>
          {showUpdateDialog && (
            <UpdateGalleryDialog
              open={showUpdateDialog}
              // onOpenChange={setShowUpdateDialog}
              closeDialog={() => setShowUpdateDialog(false)}
              gallery={row.original}
            />
          )}
          <ConfirmActionDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            action={() => deleteGalleryAction(row.original.id)}
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
