'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { EditIcon, TrashIcon } from '@/icons'
import { QuotationItemType } from '@/types'
import React from 'react'
import { QuotationEditItemButton } from './quotations/buttons'

interface Props {
	items: QuotationItemType[]
}
export function QuotationItemsTable() {
	const items = useQuotationContext(state => state.items)
	const deleteItem = useQuotationContext(state => state.deleteItem)
	const onEditItem = useQuotationContext(state => state.onEditItem)

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Descripcion</TableHead>
					<TableHead>U/M</TableHead>
					<TableHead>Cant</TableHead>
					<TableHead>P.Unit</TableHead>
					<TableHead>Total</TableHead>
					<TableHead>Acciones</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.length > 0
					? items.map(item => (
						<TableRow key={item.id}>
							<TableCell>
								<p className='min-w-[250px]'>
									{item.description}
								</p>
							</TableCell>
							<TableCell>
								{item.unit_size}
							</TableCell>
							<TableCell>
								{item.qty}
							</TableCell>
							<TableCell>
								{item.price}
							</TableCell>
							<TableCell>
								100
							</TableCell>
							<TableCell>
								<div className='flex gap-2'>
									<button
										onClick={() => onEditItem(item.id)}
										type='button'
										className='btn btn-sm'
									>
										<EditIcon />
									</button>
									<button
										onClick={() => deleteItem(item.id)}
										className='btn btn-sm'
										type='button'
									>
										<TrashIcon />
									</button>
								</div>
							</TableCell>
						</TableRow>
					))
					: (
						<TableRow>
							<TableCell colSpan={6}>
								Sin info
							</TableCell>
						</TableRow>
					)}
			</TableBody>
		</Table>
	)
}
