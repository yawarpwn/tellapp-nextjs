import clsx from 'clsx'
function Input({
  labelText,
  className,
  classContainer,
  inputRef,
  errors,
  ariaLabelledby,
  ...props
}) {
  const inputClassName = clsx(
    'input input-bordered',
    {
      'input-error': errors?.length > 0,
    },
    className,
  )
  return (
    <div className={`form-control ${classContainer}`}>
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input
        ref={inputRef}
        aria-labelledby={ariaLabelledby}
        className={inputClassName}
        {...props}
      />
      {errors?.map(error => (
        <div
          id={ariaLabelledby}
          className="text-error text-sm ml-1"
          key={error}
        >
          {error}
        </div>
      ))}
    </div>
  )
}

export default Input
