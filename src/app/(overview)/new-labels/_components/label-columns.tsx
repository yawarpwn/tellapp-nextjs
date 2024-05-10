'use client'

import type { LabelType } from '@/types'
import React from 'react'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { deleteLabelAction } from '@/lib/actions/labels'
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

import {
	createColumnHelper,
} from '@tanstack/react-table'
import jsPDF from 'jspdf'

const columnHelper = createColumnHelper<LabelType>()

export const customerColumns = [
	columnHelper.accessor('recipient', {
		header: 'Destinatario',
		cell: props => props.getValue(),
	}),

	columnHelper.accessor('dni_ruc', {
		header: 'Ruc/Dni',
		cell: props => props.getValue(),
	}),

	columnHelper.accessor('destination', {
		header: 'Destino',
		cell: props => props.getValue(),
	}),

	columnHelper.display({
		id: 'actions',
		cell: function Cell({ row }) {
			const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)

			const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)

			const template = `<h1>Hello, World!</h1>`

			const printPdf = async () => {
				console.log('printPdf')
				try {
					const res = await fetch('api/print-label', {
						method: 'POST',
						body: JSON.stringify(row.original),
						headers: {
							'Content-Type': 'application/json',
						},
					})

					if (!res.ok) {
						throw new Error(res.statusText)
					}

					const blob = await res.blob()
					const url = URL.createObjectURL(blob)

					window.open(url, '_blank')
				} catch (error) {
					console.log(error)
				}
			}
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
						<Button size='sm'>
							<MoreHorizontal className='w-4 h-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Acciones</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onSelect={printPdf}
						>
							Imprimir
						</DropdownMenuItem>
						<DropdownMenuItem
							onSelect={() => setShowUpdateDialog(true)}
						>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
							Borrar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	}),
]
