function Input({ labelText, ...props}) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input
        className="input"
        {...props}
      />
    </div>
  )
}

export default Input
