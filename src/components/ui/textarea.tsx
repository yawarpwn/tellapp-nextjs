import { cn } from '@/lib/utils'
import { useId } from 'react'
import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
	labelText: string
	errors?: any
	ariaLabelledby?: string
	disabled?: boolean
}
export function Textarea(props: Props) {
	const {
		labelText,
		errors,
		ariaLabelledby,
		disabled,
		className,
		...restProps
	} = props

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
						<textarea
							id={id}
							aria-labelledby={ariaLabelledby}
							className={cn(
								`block w-full rounded-md  bg-base-200 text-sm border border-base-300 outline-none 
placeholder:text-base-content/50  py-3 px-4 
focus-visible:border-primary
input-form resize-none
`,
								errors && 'bg-base-300 border-red-900',
								className,
							)}
							disabled={disabled}
							{...restProps}
						/>
					</div>
				</div>

				{/* handle Error */}
				{errors?.map((error: any) => (
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
