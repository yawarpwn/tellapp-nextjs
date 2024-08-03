'use client'

import { DataTablePagination } from '@/components/data-table-pagination'
import { buttonVariants } from '@/components/ui/button'
import { EmpetyIcon } from '@/icons'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  type RowSelectionState,
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
import { useSearchParams } from 'next/navigation'
import { FloatingBar } from './_components/floating-bar'
import { getColumns } from './columns'

interface Props {
  data: QuotationType[]
  // columns: ColumnDef<QuotationType>[]
}

export function DataTable(props: Props) {
  const { data } = props

  const params = useSearchParams()
  const query = params.get('q')
  const [globalFilter, setGlobalFilter] = React.useState(query || '')
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 14,
  })

  const columns = React.useMemo(() => getColumns(), [])

  const table = useReactTable({
    data,
    initialState: {},
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
    enableMultiRowSelection: false,
    enableGlobalFilter: true,
    getRowId: row => row.id,
  })

  // console.log(table.getState().rowSelection) // get the row selection state - { 1: true, 2: false, etc... }
  // console.log(table.getSelectedRowModel().rows) // get full client-side selected rows
  // console.log(table.getFilteredSelectedRowModel().rows) // get filtered client-side selected rows console.log(table.getGroupedSelectedRowModel().rows) // get grouped client-side selected rows

  const selectedRows = table.getFilteredSelectedRowModel().flatRows

  return (
    <div>
      {selectedRows.length > 0 && (
        <FloatingBar
          id={selectedRows[0].id}
          quotation={selectedRows[0].original}
          clearSelectedRow={() => table.toggleAllRowsSelected(false)}
        />
      )}
      <div className="flex items-center justify-between py-4">
        <DebouncedInput
          value={globalFilter}
          onChange={value => setGlobalFilter(String(value))}
          placeholder="Filtrar..."
        />
        <Link
          className={buttonVariants({ variant: 'primary', size: 'sm' })}
          href="/new-quos/create"
        >
          <PlusIcon className="md:mr-2" size={24} />
          <span className="hidden md:block">Crear</span>
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
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                onClick={() => row.toggleSelected(true)}
                data-state={row.getIsSelected() && 'selected'}
                key={row.id}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="min-h-[500px]" colSpan={columns.length}>
                <div className="flex min-h-[500px] items-center justify-center">
                  <div>
                    <EmpetyIcon className="h-60 w-60" />
                    <p className="text-center text-2xl font-bold">No hay resultados</p>
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
