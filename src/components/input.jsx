function Input({ labelText, className, classContainer, ...props}) {
  return (
    <div className={`form-control ${classContainer}`}>
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input
        className={`input ${className}`}
        {...props}
      />
    </div>
  )
}

export default Input
