import Fuse from 'fuse.js'
import React from 'react'
import { useDebounce } from 'use-debounce'

const SCORE_THRESHOLD = 0.4

type UseSearchProps = {
	dataSet: any[]
	keys: string[]
}
export function useSearch({ dataSet, keys }: UseSearchProps) {
	const [searchValue, setSearchValue] = React.useState('')
	const [debouncedValue] = useDebounce(searchValue, 300)

	const fuse = React.useMemo(() => {
		const options = {
			includeScore: true,
			keys,
		}

		return new Fuse(dataSet, options)
	}, [dataSet, keys])

	const results = React.useMemo(() => {
		if (!debouncedValue) return dataSet

		const searchResult = fuse.search(debouncedValue)

		return searchResult
			.filter(fuseResult => fuseResult.score < SCORE_THRESHOLD)
			.map(fuseResult => fuseResult.item)
	}, [fuse, dataSet, debouncedValue])

	return {
		searchValue,
		setSearchValue,
		results,
	}
}
