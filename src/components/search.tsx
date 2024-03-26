'use client'
import InputSearch from '@/components/ui/input-search'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
	placeholder?: string
	searchValue: string
}
function Search({ placeholder, searchValue }: Props) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	const handleSearch = useDebouncedCallback(term => {
		const params = new URLSearchParams(searchParams)
		params.set('page', '1')
		if (term) {
			params.set('query', term)
		} else {
			params.delete('query')
		}
		replace(`${pathname}?${params.toString()}`)
	}, 300)

	return (
		<div>
			<InputSearch
				onSearchChange={event => handleSearch(event.target.value)}
				placeholder={placeholder}
				searchValue={searchValue}
			/>
		</div>
	)
}

export default Search
