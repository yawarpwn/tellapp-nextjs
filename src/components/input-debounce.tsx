import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/icons'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', String(value))
    } else {
      params.delete('q')
    }

    const url = `${pathname}?${params.toString()}`
    router.replace(url)
  }, [value, searchParams, pathname, router])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce, searchParams])

  return (
    <div className="flex items-center gap-2 rounded-md border bg-background200 px-2 py-1 [&:has(input:focus)]:border-primary ">
      <SearchIcon size={20} />
      <input
        {...props}
        value={value}
        onChange={e => setValue(e.target.value)}
        className="border-none bg-transparent outline-none"
      />
    </div>
  )
}
