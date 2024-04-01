'use client'

import { DataTablePagination } from '@/components/data-table-pagination'
import { buttonVariants } from '@/components/ui/button'
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	PaginationState,
	useReactTable,
} from '@tanstack/react-table'
import React from 'react'

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { PlusIcon } from '@/icons'

import { DebouncedInput } from '@/components/input-debounce'
import type { Quotation } from '@/types'
import Link from 'next/link'

interface Props {
	data: Quotation[]
	columns: any
}

export function DataTable(props: Props) {
	const { data, columns } = props
	const [globalFilter, setGlobalFilter] = React.useState('')
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 14,
	})

	const table = useReactTable({
		data,
		state: {
			globalFilter,
			pagination,
		},
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		debugTable: true,
		debugColumns: true,
		debugHeaders: true,
	})

	return (
		<div>
			<div className='py-4 flex items-center justify-between'>
				<DebouncedInput
					value={globalFilter ?? ''}
					onChange={(value) => setGlobalFilter(String(value))}
					placeholder='Filtrar...'
				/>
				<div className='flex gap-4'>
					<Link className={buttonVariants()} href='/new-quos/create'>
						<PlusIcon size={20} />
						<span className='ml-2'>
							Crear
						</span>
					</Link>
				</div>
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length
						? (
							table.getRowModel().rows.map(row => (
								<tr className='border-b [&_td]:px-4 [&_td]:py-2 ' key={row.id}>
									{row.getVisibleCells().map(cell => (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))
						)
						: (
							<TableRow>
								<TableCell colSpan={columns.length}>
									No hay resultados
								</TableCell>
							</TableRow>
						)}
				</TableBody>
			</Table>
			<DataTablePagination table={table} />
		</div>
	)
}
