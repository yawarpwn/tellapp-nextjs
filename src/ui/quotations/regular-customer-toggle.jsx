import { StartIcon } from '@/icons'

export function RegularCustomerToggle({ active }) {
	return (
		<button
			className={active
				? 'text-primary'
				: 'text-base-300'}
		>
			{active
				? <StartIcon filled />
				: <StartIcon />}
		</button>
	)
}
