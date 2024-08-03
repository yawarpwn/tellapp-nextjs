'use client'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export function Modal({ isOpen, onClose, title, children, size = 'sm' }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyEscape = event => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyEscape)
    return () => window.removeEventListener('keydown', handleKeyEscape)
  }, [onClose, isOpen])

  return (
    isOpen &&
    createPortal(
      <dialog
        className="modal backdrop:bg-black/80"
        ref={modalRef}
        onMouseDown={event => {
          if (event.target === event.currentTarget) {
            onClose()
          }
        }}
      >
        <div
          className={`modal-box bg-base-300/50 backdrop-blur-md backdrop-saturate-150 max-w-${size} border-base-300 border`}
        >
          {title && (
            <header className="py-2">
              <p className="mb-2 text-center">{title}</p>
            </header>
          )}
          {children}
        </div>
      </dialog>,
      window.document.body,
    )
  )
}
