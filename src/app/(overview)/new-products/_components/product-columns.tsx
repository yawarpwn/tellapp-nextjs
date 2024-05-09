'use client'

import { formatNumberToLocal } from '@/lib/utils'
import type { ProductType } from '@/types'
import React from 'react'
import { ProductRowActions } from './product-row-actions'

import {
	createColumnHelper,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper<ProductType>()

export const productColumns = [
	columnHelper.accessor('description', {
		header: 'Descripcion',
		cell: props => <div className='min-w-[250px]'>{props.getValue()}</div>,
	}),
	columnHelper.accessor('code', {
		header: 'Código',
		cell: props => (
			<div className='min-w-[100px]'>
				{props.getValue().toUpperCase()}
			</div>
		),
	}),
      columnHelper.accessor('unit_size', {
		header: 'U/M',
		cell: props => props.getValue(),
	}),
	columnHelper.accessor('price', {
		header: 'Precio',
		cell: props => formatNumberToLocal(props.getValue()),
	}),
	columnHelper.accessor('cost', {
		header: 'Costo',
		cell: props => formatNumberToLocal(props.getValue()),
	}),
	columnHelper.display({
		id: 'actions',
		cell: props => <ProductRowActions row={props.row} />,
	}),
]
