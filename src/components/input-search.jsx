import { SearchIcon } from '@/icons'

function InputSearch({ searchValue, onSearchChange, placeholder }) {
  return (
    <div className="group w-full flex flex-col">
      <div className="h-full flex flex-col">
        <div className="input input-bordered flex items-center gap-x-2 max-w-xs">
          <SearchIcon />
          <input
            value={searchValue}
            onChange={onSearchChange}
            className="w-full h-full placeholder:text-base-content/30 outline-none font-normal bg-transparent placeholder:text-foreground-500"
            type="search"
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  )
}

export default InputSearch
