'use client'

import { formatNumberToLocal } from '@/lib/utils'
import type { Product } from '@/types'
import React from 'react'
import { ProductRowActions } from './product-row-actions'
import { ExternalLink } from 'lucide-react'

import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<Product>()

export const productColumns = [
  columnHelper.accessor('description', {
    header: 'Descripcion',
    cell: props => (
      <div className="min-w-[250px]">
        <p>{props.getValue()}</p>
      </div>
    ),
  }),

  columnHelper.accessor('link', {
    header: 'Link',
    cell: props =>
      props.getValue() ? (
        <a
          target="_blank"
          className="text-xs text-primary underline"
          href={props.getValue() ?? '#'}
        >
          <ExternalLink size={18} />
        </a>
      ) : (
        ''
      ),
  }),
  columnHelper.accessor('unitSize', {
    header: 'U/M',
    cell: props => props.getValue(),
  }),
  columnHelper.accessor('cost', {
    header: 'Costo',
    cell: props => formatNumberToLocal(props.getValue()),
  }),

  columnHelper.accessor('price', {
    header: 'Precio',
    cell: props => formatNumberToLocal(props.getValue()),
  }),
  columnHelper.accessor('code', {
    header: 'Código',
    cell: props => <div className="min-w-[100px]">{props.getValue().toUpperCase()}</div>,
  }),
  columnHelper.display({
    id: 'actions',
    cell: props => <ProductRowActions row={props.row} />,
  }),
]
