'use client'

import { type CustomerType } from '@/types'
import { createColumnHelper, type Row } from '@tanstack/react-table'

const columnHelper = createColumnHelper<CustomerType>()

function RowActions({ row }: { row: Row<CustomerType> }) {
	return (
		<div>
			<button>Abrir</button>
		</div>
	)
}

export const columns = [
	columnHelper.accessor('name', {
		header: 'Cliente',
	}),
	columnHelper.accessor('ruc', {
		header: 'Email',
		cell: props => props.getValue(),
	}),
	columnHelper.display({
		id: 'actions',
		cell: props => <RowActions row={props.row} />,
	}),
]
