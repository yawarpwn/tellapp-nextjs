'use client'

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

export const columns = [
	columnHelper.accessor('number', {
		header: 'Nro',
		cell: props => <span>{props.getValue()}</span>,
	}),
	columnHelper.accessor('company', {
		header: 'Cliente',
		cell: props => <p className='min-w-[250px]'>{props.getValue()}</p>,
	}),
	columnHelper.accessor('ruc', {
		header: 'Ruc',
		cell: props => <span>{props.getValue()}</span>,
	}),
	columnHelper.accessor('created_at', {
		header: 'Fecha',
		cell: (props) => (
			<div className='w-[max-content]'>
				{getFormatedDate(props.getValue())}
			</div>
		),
	}),
	columnHelper.accessor('items', {
		header: 'Monto',
		cell: props => getIgv(props.getValue()).formatedTotal,
	}),
	columnHelper.display({
		id: 'actions',
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button className='btn btn-sm btn-ghost'>
							<MoreHorizontal className='w-4 h-4' />
						</button>
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
					</DropdownMenuContent>
				</DropdownMenu>
			)
		},
	}),
]
