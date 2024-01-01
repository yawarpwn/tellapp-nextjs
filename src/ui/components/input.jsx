import clsx from 'clsx'
function Input({ labelText, className, classContainer, inputRef, errors, ariaLabelledby, disabled, as, ...props }) {
	const inputClassName = clsx(
		'w-full placeholder:text-base-content/30',
		as === 'textarea' ? 'textarea textarea-bordered' : 'input input-bordered  ',
		{
			'input-error': errors?.length > 0,
			'resize-none': as === 'textarea',
			'h-[80px]': as === 'textarea',
			textarea: as === 'textarea',
		},
		className,
	)

	const Component = as ? as : 'input'
	return (
		<div className={`form-control w-full`}>
			<label className="label">
				<span className="label-text">{labelText}</span>
			</label>
			<Component
				ref={inputRef}
				aria-labelledby={ariaLabelledby}
				className={inputClassName}
				disabled={disabled}
				{...props}
			/>

			{/* handle Error */}
			{errors?.map(error => (
				<div id={ariaLabelledby} aria-live="polite" className="text-error text-sm ml-1" key={error}>
					{error}
				</div>
			))}
		</div>
	)
}

export default Input
