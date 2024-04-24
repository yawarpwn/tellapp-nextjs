import { Input } from '@/components/ui/input'
import { SearchIcon } from '@/icons'
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

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value)
		}, debounce)

		return () => clearTimeout(timeout)
	}, [value, onChange, debounce])

	return (
		<div className='flex items-center gap-2 bg-background200 py-1 px-2 rounded-md border [&:has(input:focus)]:border-primary '>
			<SearchIcon size={20} />
			<input
				{...props}
				value={value}
				onChange={e => setValue(e.target.value)}
				className='bg-transparent border-none outline-none'
			/>
		</div>
	)
}
