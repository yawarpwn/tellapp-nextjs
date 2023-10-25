'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
function FormModal({
  children,
  onClose,
  isOpen,
  loading,
  title = 'Default modal title',
  onSubmit,
}) {
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
    isOpen &&
    createPortal(
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
          <form onSubmit={onSubmit}>
            <header>
              <p className="text-center">{title}</p>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-primary"
              >
                ✕
              </button>
            </header>
            {children}
            <footer className="flex justify-between mt-4">
              <button disabled={loading} type="submit" className="btn">
                {loading ? (
                  <span className="loading loading-dots" />
                ) : (
                  <span>Aceptar</span>
                )}
              </button>
              <button
                disabled={loading}
                onClick={onClose}
                type="button"
                className="btn btn-error"
              >
                Cancelar
              </button>
            </footer>
          </form>
        </div>
      </dialog>,
      window.document.body,
    )
  )
}

export default FormModal
