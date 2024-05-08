'use client'

import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button } from '@/components/ui/button'
import { deleteProductAction } from '@/lib/actions/products'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'
import { UpdateProductSheet } from '../_components/update-product-sheet'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { type ProductType } from '@/types'
import { type Row } from '@tanstack/react-table'

interface Props {
	row: Row<ProductType>
}
export function ProductRowActions({
	row,
}: Props) {
	const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
	const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)

	return (
		<DropdownMenu>
			<ConfirmActionDialog
				open={showDeleteDialog}
				onOpenChange={setShowDeleteDialog}
				action={() => deleteProductAction(row.original.id)}
				showTrigger={false}
			/>
			<UpdateProductSheet
				open={showUpdateDialog}
				onOpenChange={setShowUpdateDialog}
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
}
