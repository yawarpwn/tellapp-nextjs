function Input({ labelText, className, classContainer, inputRef, ...props }) {
  return (
    <div className={`form-control ${classContainer}`}>
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input ref={inputRef} className={`input w-full ${className}`} {...props} />
    </div>
  )
}

export default Input
