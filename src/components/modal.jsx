function Modal({ children, modalRef, onClose }) {
  return (
    <dialog
      ref={modalRef}
      className="modal"
      onMouseDown={e => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="modal-box">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500"
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
