import { SearchIcon } from '@/icons'

function InputSearch() {
  return (
    <div className="group w-full flex flex-col sm:max-w-[40%]">
      <div className="h-full flex flex-col">
        <div className="input input-bordered flex items-center gap-x-2 max-w-xs">
          <SearchIcon />
          <input
            className="w-full h-full outline-none font-normal bg-transparent placeholder:text-foreground-500"
            type="search"
          />
        </div>
      </div>
    </div>
  )
}

export default InputSearch
