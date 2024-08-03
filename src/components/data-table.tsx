'use client'

import { DataTablePagination } from '@/components/data-table-pagination'
import { DebouncedInput } from '@/components/input-debounce'
import { EmpetyIcon } from '@/icons'
import type { ProductType } from '@/types'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
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

interface Props {
  data: ProductType[]
  columns: any
  createComponent: React.ReactNode
}

export function DataTable({ data, columns, createComponent }: Props) {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageSize: 14,
    pageIndex: 0,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <DebouncedInput
          value={globalFilter}
          onChange={value => setGlobalFilter(String(value))}
          placeholder="Filtrar..."
        />
        {createComponent}
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
