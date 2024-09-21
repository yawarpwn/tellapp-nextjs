'use client'

import { PRODUCT_CATEGORIES } from '@/constants'

import { DataTablePagination } from '@/components/data-table-pagination'
import { DebouncedInput } from '@/components/input-debounce'
import { EmpetyIcon } from '@/icons'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  type ColumnFiltersState,
  type Column,
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

interface Props<T> {
  data: T[]
  columns: any
  showCategory?: boolean
  createComponent: React.ReactNode
}

function ProductFilter({ column }: { column: Column<any, unknown> }) {
  const columnFilterValue = column.getFilterValue()
  const { filterVariant } = column.columnDef.meta ?? {}

  return (
    <Select onValueChange={value => column.setFilterValue(value)}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={' '}>Todos</SelectItem>
          {Object.values(PRODUCT_CATEGORIES).map(category => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    // See faceted column filters example for datalist search suggestions
  )
}

// A typical debounced input react component

export function DataTable<T>({ data, columns, createComponent, showCategory }: Props<T>) {
  const [globalFilter, setGlobalFilter] = React.useState('')
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageSize: 14,
    pageIndex: 0,
  })

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
      pagination,
    },
    onColumnFiltersChange: setColumnFilters,
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
      {showCategory && (
        <div className="flex items-center justify-end gap-2">
          <ProductFilter column={table.getColumn('category')} />
        </div>
      )}
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
