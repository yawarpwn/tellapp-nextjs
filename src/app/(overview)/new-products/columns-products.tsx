'use client'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { deleteProductAction } from '@/lib/actions/products'
import type { ProductType } from '@/types'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import { UpdateProductSheet } from './_components/update-product-sheet'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { type ColumnDef } from '@tanstack/react-table'

export function getProductColumns(): ColumnDef<ProductType>[] {
	return [
		{
			header: 'Descripcion',
			accessorKey: 'description',
			enableGlobalFilter: true,
			cell: ({ row }) => (
				<div className='min-w-[250px]'>
					<span>{row.original.description}</span>
				</div>
			),
		},
		{
			header: 'Código',
			accessorKey: 'code',
			enableGlobalFilter: true,
			cell: ({ row }) => (
				<div className='min-w-[80px]'>
					<span className='uppercase'>{row.original.code}</span>
				</div>
			),
		},
		{
			header: 'U/M',
			enableGlobalFilter: false,
			cell: ({ row }) => (
				<div>
					<span>{row.original.unit_size}</span>
				</div>
			),
		},
		{
			header: 'Precio',
			enableGlobalFilter: false,
			cell: ({ row }) => (
				<div>
					<span>{row.original.price}</span>
				</div>
			),
		},
		{
			header: 'Costo',
			enableGlobalFilter: false,
			cell: ({ row }) => (
				<div>
					<span>{row.original.cost}</span>
				</div>
			),
		},
		{
			id: 'actions',
			cell: function Cell({ row }) {
				const [showDeleteModal, setShowDeleteModal] = React.useState(false)
				const [showUpdateProductSheet, setShowUpdateProductSheet] = React
					.useState(
						false,
					)
				const openDeleteModal = () => setShowDeleteModal(true)
				const closeDeleteModal = () => setShowDeleteModal(false)

				return (
					<DropdownMenu>
						<ConfirmActionDialog
							action={() => deleteProductAction(row.original.id)}
							dialogTitle={
								<>
									¿Deseas borrar el producto{' '}
									<span className='font-bold text-accent'>
									</span>
								</>
							}
							onSuccess={closeDeleteModal}
							open={showDeleteModal}
							onOpenChange={setShowDeleteModal}
							showTrigger={false}
						/>
						<UpdateProductSheet
							open={showUpdateProductSheet}
							onOpenChange={setShowUpdateProductSheet}
							product={row.original}
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
								onSelect={() => setShowUpdateProductSheet(true)}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={openDeleteModal}>
								Borrar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)
			},
		},
	]
}
