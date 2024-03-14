'use client'
import InputSearch from '@/ui/components/input-search'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
function Search({ placeholder = 'Buscar..' }) {
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
			/>
		</div>
	)
}

export default Search
