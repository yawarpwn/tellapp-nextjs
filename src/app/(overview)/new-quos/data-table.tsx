'use client'

import { DataTablePagination } from '@/components/data-table-pagination'
import { buttonVariants } from '@/components/ui/button'
import { EmpetyIcon } from '@/icons'
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
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { PlusIcon } from '@/icons'

import { DebouncedInput } from '@/components/input-debounce'
import type { QuotationType } from '@/types'
import Link from 'next/link'
import { getColumns } from './columns'

interface Props {
	data: QuotationType[]
	columns: any
}

export function DataTable(props: Props) {
	const { data } = props
	const [globalFilter, setGlobalFilter] = React.useState('')
	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 14,
	})

	const columns = React.useMemo(() => getColumns(), [])

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
				<Link
					className={buttonVariants({ variant: 'primary' })}
					href='/new-quos/create'
				>
					<PlusIcon className='mr-2' size={20} />
					Crear
				</Link>
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
								<TableCell
									className='min-h-[500px]'
									colSpan={columns.length}
								>
									<div className='min-h-[500px] flex items-center justify-center'>
										<div>
											<EmpetyIcon className='w-60 h-60' />
											<p className='text-center text-2xl font-bold'>
												No hay resultados
											</p>
										</div>
									</div>
								</TableCell>
							</TableRow>
						)}
				</TableBody>
			</Table>
			<DataTablePagination table={table} />
		</div>
	)
}
