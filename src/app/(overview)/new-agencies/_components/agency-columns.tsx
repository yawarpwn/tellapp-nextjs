'use client'

import type { AgencyType } from '@/types'
import React from 'react'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { deleteAgencyAction } from '@/lib/actions/agencies'
import { MoreHorizontal } from 'lucide-react'
import { UpdateAgencySheet } from './update-agency-sheet'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

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

const columnHelper = createColumnHelper<AgencyType>()

export const agencyColumns = [
	columnHelper.accessor('company', {
		header: 'Cliente',
		cell: props => (
			<div className='min-w-[250px]'>
				<p>
					{props.getValue()}
				</p>
				<p className='text-sm text-muted-foreground'>
					{props.row.original.address}
				</p>
			</div>
		),
	}),
	columnHelper.accessor('ruc', {
		header: 'Ruc',
		cell: props => props.getValue(),
	}),
	columnHelper.accessor('phone', {
		header: 'Teléfono',
		cell: props => props.getValue(),
	}),
	columnHelper.accessor('destinations', {
		header: 'Destinos',
		cell: props => {
			const { destinations } = props.row.original
			return (
				<div>
					<Select>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder={destinations[0]} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{destinations.length > 0
									&& destinations.map((destination: string) => (
										<SelectItem value={destination} key={destination}>
											{destination}
										</SelectItem>
									))}
							</SelectGroup>
						</SelectContent>
					</Select>
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
					<ConfirmActionDialog
						open={showDeleteDialog}
						onOpenChange={setShowDeleteDialog}
						action={() => deleteAgencyAction(row.original.id)}
						showTrigger={false}
					/>
					<UpdateAgencySheet
						open={showUpdateDialog}
						onOpenChange={setShowUpdateDialog}
						agency={row.original}
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
