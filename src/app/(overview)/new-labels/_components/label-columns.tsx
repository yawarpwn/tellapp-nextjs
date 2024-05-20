'use client'

import type { LabelType } from '@/types'
import React from 'react'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { LabelTemplate } from '@/components/label-template'
import { Button } from '@/components/ui/button'
import { deleteLabelAction } from '@/lib/actions/labels'
import { MoreHorizontal } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
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

const columnHelper = createColumnHelper<LabelType>()

export const customerColumns = [
	columnHelper.accessor('recipient', {
		header: 'Destinatario',
		cell: props => (
			<div className='min-w-[250px]'>
				<p>
					{props.getValue()}
				</p>
				<p>
					{props.row.original.dni_ruc}
				</p>
			</div>
		),
	}),
	columnHelper.accessor('destination', {
		header: 'Destino',
		cell: props => (
			<div>
				<p>{props.getValue()}</p>
				{props.row.original.address && <p>{props.row.original.address}</p>}
			</div>
		),
	}),
	columnHelper.accessor('phone', {
		header: 'Teléfono',
		cell: props => props.getValue(),
	}),
	columnHelper.accessor('agency_id', {
		header: 'Agencia',
		cell: ({ row }) => {
			const agency = row.original.agencies
				? row.original.agencies.company
				: 'Ninguna'
			return <span>{agency}</span>
		},
	}),

	columnHelper.display({
		id: 'actions',
		cell: function Cell({ row }) {
			const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
			const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)
			const containerRef = React.useRef(null)

			const printPdf = useReactToPrint({
				content: () => containerRef.current,
			})

			return (
				<DropdownMenu>
					{showUpdateDialog && (
						<UpdateLabelSheet
							open={showUpdateDialog}
							onOpenChange={setShowUpdateDialog}
							label={row.original}
						/>
					)}
					<div className='hidden'>
						<LabelTemplate label={row.original} ref={containerRef} />
					</div>
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
