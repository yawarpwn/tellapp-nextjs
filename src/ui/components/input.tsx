import { cn } from '@/utils'
import { useId } from 'react'
import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	labelText: string
	inputRef?: any
	errors?: any
	ariaLabelledby?: string
	disabled?: boolean
	as?: 'input' | 'textarea'
}
export function Input(props: Props) {
	const {
		labelText,
		inputRef,
		errors,
		ariaLabelledby,
		disabled,
		as,
		...restProps
	} = props

	const Component = as ? as : 'input'
	const id = useId()
	return (
		<div className='grid grid-cols-12 gap-2 text-sm'>
			<div className='flex flex-row justify-between col-span-12'>
				<label className='block text-base-content/70' htmlFor={id}>
					{labelText}
				</label>
			</div>
			<div className='col-span-12'>
				<div>
					<div className='relative'>
						<Component
							id={id}
							ref={inputRef}
							aria-labelledby={ariaLabelledby}
							className={cn(
								`block w-full rounded-md  bg-base-200 text-sm border border-base-300 outline-none 
placeholder:text-base-content/50  py-3 px-4 
focus-visible:border-primary
input-form
`,
								{
									'h-20 resize-none': as == 'textarea',
									'bg-base-300 border-red-900': errors,
								},
							)}
							disabled={disabled}
							{...restProps}
						/>
					</div>
				</div>

				{/* handle Error */}
				{errors?.map(error => (
					<div
						id={ariaLabelledby}
						aria-live='polite'
						className='text-error text-xs mt-1'
						key={error}
					>
						{error}
					</div>
				))}
			</div>
		</div>
	)
}
