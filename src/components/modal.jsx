'use client'

import { useEffect, useRef } from 'react'
function Modal({ children, onClose, isOpen, title = 'Default modal title' }) {
  const modalRef = useRef(null)
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  })

  useEffect(() => {
    const handleKeyEscape = event => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyEscape)
    return () => window.removeEventListener('keydown', handleKeyEscape)
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
        <header>
          <p className='text-center'>{title}</p>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-primary"
          >
            ✕
          </button>
        </header>
        {children}
        <footer className='flex justify-between'>
          <button type='submit' className='btn'> Aceptar</button>
          <button onClick={onClose} type='button' className='btn btn-error'> Cancelar</button>
        </footer>
      </div>
    </dialog>
  )
}

export default Modal
