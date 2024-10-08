'use client'

import type { Label } from '@/types'
import React from 'react'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { deleteLabelAction } from '@/lib/actions/labels'
import { generateLabelPdf } from '@/lib/pdf-doc/generate-label-pdf'
import { MoreHorizontal } from 'lucide-react'
import { UpdateLabelSheet } from './update-label-sheet'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<Label>()

export const labelColumns = [
  columnHelper.accessor('recipient', {
    header: 'Destinatario',
    cell: props => (
      <div className="min-w-[250px]">
        <p>{props.getValue()}</p>
        <p>{props.row.original.dniRuc}</p>
      </div>
    ),
  }),
  columnHelper.accessor('destination', {
    header: 'Destino',
    cell: props => (
      <div>
        <p>{props.getValue().toUpperCase()}</p>
        {props.row.original.address && <p>{props.row.original.address}</p>}
      </div>
    ),
  }),

  columnHelper.accessor('observations', {
    header: 'Observaciones',
    cell: props => <p className="text-sm text-muted-foreground">{props.getValue()}</p>,
  }),
  columnHelper.accessor('phone', {
    header: 'Teléfono',
    cell: props => props.getValue(),
  }),
  columnHelper.accessor('agencyId', {
    header: 'Agencia',
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.original.agency?.name || ''}</p>
          <p>{row.original.agency?.ruc || ''}</p>
        </div>
      )
    },
  }),

  columnHelper.display({
    id: 'actions',
    cell: function Cell({ row }) {
      const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
      const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)

      return (
        <DropdownMenu>
          {showUpdateDialog && (
            <UpdateLabelSheet
              open={showUpdateDialog}
              onOpenChange={setShowUpdateDialog}
              label={row.original}
            />
          )}
          <ConfirmActionDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            action={() => deleteLabelAction(row.original.id)}
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
            <DropdownMenuItem
              onSelect={() => {
                generateLabelPdf(row.original).print()
              }}
            >
              Imprimir
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                generateLabelPdf(row.original).download()
              }}
            >
              Descargar
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={() => {
                generateLabelPdf(row.original).open()
              }}
            >
              Ver
            </DropdownMenuItem>

            <DropdownMenuItem onSelect={() => setShowUpdateDialog(true)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>Borrar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
]
