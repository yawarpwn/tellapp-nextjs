function Input({ labelText, className, classContainer, inputRef, ...props }) {
  return (
    <div className={`form-control ${classContainer}`}>
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input ref={inputRef}
        className={`input input-bordered  placeholder:text-base-content/30 w-full ${className}`} {...props}
      />
    {/* <div className="ml-2 text-sm text-red-500"> */}
    {/* Otro text Error */}
    {/* </div> */}
    </div>
  )
}

export default Input
