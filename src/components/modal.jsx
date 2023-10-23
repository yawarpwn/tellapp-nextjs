'use client'

import { useEffect, useRef } from 'react'
function Modal({ children, onClose, isOpen }) {
  const modalRef = useRef(null)
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  })

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
          type="button"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-primary"
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
