import Fuse from 'fuse.js'
import React from 'react'
import { useDebounce } from 'use-debounce'

import type { QuotationType } from '@/types'
type Props = {
	data: QuotationType[]
}

const ROWS_PER_PAGE = 20

export function useTable({ data }: Props) {
	// const [dataTable, setDataTable] = React.useState(data)
	const [filter, setFilter] = React.useState('')
	const [page, setPage] = React.useState(1)
	const [filterDebounce] = useDebounce(filter, 300)

	const totalPages = Math.ceil(data.length / ROWS_PER_PAGE)

	const nextPage = () => {
		setPage((currentPage) => currentPage + 1)
	}

	const previousPage = () => {
		setPage((currentPage) => currentPage - 1)
	}

	const filteredData = React.useMemo(() => {
		let result = data

		if (filterDebounce) {
			const fuse = new Fuse(data, {
				keys: [
					{
						name: 'number',
						weight: 0.5,
					},
					{
						name: 'company',
						weight: 0.3,
					},
				],
				threshold: 0.3,
			})
			const results = fuse.search(filterDebounce)
			result = results.map(result => result.item)
		}

		const startIndex = (page - 1) * ROWS_PER_PAGE
		const endIndex = startIndex + ROWS_PER_PAGE

		const slicedResult = result.slice(startIndex, endIndex)
		console.log(slicedResult, startIndex, endIndex, ROWS_PER_PAGE)
		return slicedResult
	}, [filterDebounce, data, page])

	const onFilterChange = (filterValue: string) => {
		setFilter(filterValue)
		setPage(1)
	}

	const getRows = () => {
		return filteredData
	}
	return {
		getRows,
		onFilterChange,
		nextPage,
		previousPage,
		canNextPage: page < totalPages,
		canPreviousPage: page > 1,
	}
}
