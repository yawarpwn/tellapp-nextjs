'use client'

import { Button } from '@/components/ui/button'
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
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<QuotationType>()

export function getColumns(): ColumnDef<QuotationType>[] {
	return [
		{
			header: 'Nro',
			cell: ({ row }) => <span>{row.original.number}</span>,
		},
		{
			header: 'Cliente',
			cell: ({ row }) => (
				<div>
					<p className='min-w-[250px]'>
						{row.original.company || 'SIN RUC'}
					</p>
					<p>{row.original.ruc}</p>
				</div>
			),
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
				return (
					<DropdownMenu>
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
							<DropdownMenuItem onSelect={() => setShowDeleteModal(true)}>
								Borrar
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => setShowDeleteModal(true)}>
								Duplicar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]
}
