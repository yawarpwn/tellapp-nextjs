'use client'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	deleteQuotationAction,
	duplicateQuotationAction,
} from '@/lib/actions/quoatations'
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

import { getFormatedDate, getIgv } from '@/lib/utils'
import { type QuotationType } from '@/types'
import { type ColumnDef } from '@tanstack/react-table'

export function getColumns(): ColumnDef<QuotationType>[] {
	return [
		{
			header: 'Nro',
			accessorKey: 'number',
			enableGlobalFilter: true,
			cell: ({ row }) => (
				<div className='flex items-center gap-1'>
					<span>{row.original.number}</span>
				</div>
			),
		},
		{
			accessorKey: 'company',
			header: 'Cliente',
			cell: ({ row }) => (
				<div>
					<p className='min-w-[250px]'>
						{row.original.company || 'SIN RUC'}
					</p>
					<p>{row.original.ruc}</p>
				</div>
			),
			enableGlobalFilter: true,
		},
		{
			header: 'Fecha',
			cell: ({ row }) => (
				<div className='w-[max-content]'>
					{getFormatedDate(row.original.created_at)}
				</div>
			),
		},
		{
			header: 'Monto',
			cell: ({ row }) => getIgv(row.original.items).formatedTotal,
		},
		{
			id: 'actions',
			cell: function Cell({ row }) {
				const [showDeleteModal, setShowDeleteModal] = React.useState(false)
				const [showDuplicateModal, setShowDuplicateModal] = React.useState(
					false,
				)

				const openDuplicateModal = () => setShowDuplicateModal(true)
				const openDeleteModal = () => setShowDeleteModal(true)
				const closeDeleteModal = () => setShowDeleteModal(false)
				const closeDuplicateModal = () => setShowDuplicateModal(false)

				return (
					<DropdownMenu>
						<ConfirmActionDialog
							action={() => deleteQuotationAction(row.original.id)}
							dialogTitle={
								<>
									¿Deseas borrar la cotización{' '}
									<span className='font-bold text-accent'>
										#{row.original.number}
									</span>
								</>
							}
							onSuccess={closeDeleteModal}
							open={showDeleteModal}
							onOpenChange={setShowDeleteModal}
							showTrigger={false}
						/>

						<ConfirmActionDialog
							action={() => duplicateQuotationAction(row.original.id)}
							dialogTitle={
								<>
									¿Deseas Duplicar la cotización{' '}
									<span className='font-bold text-accent'>
										#{row.original.number}
									</span>
								</>
							}
							onSuccess={closeDuplicateModal}
							open={showDuplicateModal}
							onOpenChange={setShowDuplicateModal}
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
							<DropdownMenuItem asChild>
								<Link href={`/quotations/${row.original.number}`}>Ver</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href={`/new-quos/${row.original.number}/update`}>
									Editar
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={openDeleteModal}>
								Borrar
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={openDuplicateModal}>
								Duplicar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]
}
