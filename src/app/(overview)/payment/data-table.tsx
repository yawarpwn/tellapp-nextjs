'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTable } from '@/hooks/use-table'
import type { Quotation } from '@/types'
import React from 'react'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { formatDateToLocal, getIgv } from '@/lib/utils'

interface DataTableProps {
	columns: []
	data: Quotation[]
}

export function DataTable({
	columns,
	data,
}: DataTableProps) {
	// const [sorting, setSorting] = React.useState<SortingState>([])
	// const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([],)
	console.log(data)
	const table = useTable({ data })

	return (
		<div>
			<div className='flex items-center py-4'>
				<input
					className='input'
					placeholder='Buscar'
					onChange={e => table.onFilterChange(e.target.value)}
				/>
			</div>
			<div className='rounded-md  overflow-x-auto'>
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map(column => {
								return (
									<TableHead key={column.header}>
										{column.header}
									</TableHead>
								)
							})}
						</TableRow>
					</TableHeader>
					<TableBody>
						{table.getRows().map(quotation => {
							const formattedDate = formatDateToLocal(quotation.created_at)
							const { formatedTotal } = getIgv(quotation.items)
							return (
								<TableRow key={quotation.id}>
									<TableCell>
										{quotation.number}
									</TableCell>
									<TableCell>
										{quotation.company}
									</TableCell>
									<TableCell>
										{quotation.ruc}
									</TableCell>
									<TableCell>
										{formattedDate}
									</TableCell>
									<TableCell>
										{formatedTotal}
									</TableCell>
								</TableRow>
							)
						})}

						{/* <TableRow> */}
						{/* 	<TableCell */}
						{/* 		colSpan={columns.length} */}
						{/* 		className='h-24 text-center' */}
						{/* 	> */}
						{/* 		No results. */}
						{/* 	</TableCell> */}
						{/* </TableRow> */}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.canPreviousPage}
				>
					Previous
				</Button>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.canNextPage}
				>
					Next
				</Button>
			</div>
		</div>
	)
}
