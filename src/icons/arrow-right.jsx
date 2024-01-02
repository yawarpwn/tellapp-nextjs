import React from 'react'

function ArrowRight({ size }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			width={size || 24}
			height={size || 24}
			strokeWidth={1.5}
			stroke='currentColor'
			className='w-6 h-6'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
			/>
		</svg>
	)
}

export default ArrowRight
