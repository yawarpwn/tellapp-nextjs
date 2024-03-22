import { SearchIcon } from '@/icons'
import React from 'react'

interface Props {
	searchValue?: string
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
}

function InputSearch(
	{ searchValue, onSearchChange, placeholder = 'Buscar...' }: Props,
) {
	return (
		<div className='w-full border border-base-300 rounded-md focus:border-primary'>
			<div className='h-8 px-4 flex items-center gap-x-2 max-w-xs '>
				<SearchIcon />
				<input
					defaultValue={searchValue}
					onChange={onSearchChange}
					className={`
            w-full h-full placeholder:text-base-content/30 font-normal bg-transparent 
            placeholder:text-foreground-500 outline-none border-transparent focus-visible:border-primary`}
					type='search'
					placeholder={placeholder}
				/>
			</div>
		</div>
	)
}

export default InputSearch
