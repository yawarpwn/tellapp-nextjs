import { type IconProps } from '@/icons'

export default function Icon({ size = 24, ...props }: IconProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			width={size}
			height={size}
			{...props}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
			/>
		</svg>
	)
}
