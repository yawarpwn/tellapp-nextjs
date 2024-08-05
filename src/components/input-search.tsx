import { SearchIcon } from '@/icons'
import React from 'react'

interface Props {
  searchValue?: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

function InputSearch({ searchValue, onSearchChange, placeholder = 'Buscar...' }: Props) {
  return (
    <div className="border-base-300 w-full rounded-md border focus:border-primary">
      <div className="flex h-8 max-w-xs items-center gap-x-2 px-4 ">
        <SearchIcon />
        <input
          defaultValue={searchValue}
          onChange={onSearchChange}
          className={`
            placeholder:text-base-content/30 placeholder:text-foreground-500 h-full w-full border-transparent 
            bg-transparent font-normal outline-none focus-visible:border-primary`}
          type="search"
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default InputSearch
