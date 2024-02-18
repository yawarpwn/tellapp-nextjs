import { SearchIcon } from '@/icons'
import React from 'react'

interface Props {
	searchValue?: string
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder: string
}

function InputSearch({ searchValue, onSearchChange, placeholder }: Props) {
	return (
		<div className='group w-full flex flex-col border border-base-300 rounded-md'>
			<div className='h-full flex flex-col'>
				<div className='input input-sm flex items-center gap-x-2 max-w-xs'>
					<SearchIcon />
					<input
						value={searchValue}
						onChange={onSearchChange}
						className='w-full h-full placeholder:text-base-content/30 outline-none font-normal bg-transparent placeholder:text-foreground-500'
						type='search'
						placeholder={placeholder}
					/>
				</div>
			</div>
		</div>
	)
}

export default InputSearch
