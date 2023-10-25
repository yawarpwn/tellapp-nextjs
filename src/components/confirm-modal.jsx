import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
function ConfirmModal({
  onClose,
  children,
  loading,
  isOpen,
  modalTitle = ' Default message to show in Confirm Modal',
  onConfirm,
}) {
  const modalRef = useRef()
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpen, modalRef])

  useEffect(() => {
    const handleKeyScape = event => {
      if (event.key === 'Escape') {
        console.log('effect esc')
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyScape)

    return () => window.removeEventListener('keydown', handleKeyScape)
  }, [onClose])

  return (
    isOpen &&
    createPortal(
      <dialog ref={modalRef} className="modal">
        <div className="modal-box max-w-xs flex flex-col gap-4 ">
          <p className="text-center">{modalTitle}</p>
          {children}
          <div className="flex justify-between gap-2">
            <button
              disabled={loading}
              onClick={onConfirm}
              type="button"
              className="btn btn-success"
            >
              {loading ? <span className="loading loading-dots" /> : 'Aceptar'}
            </button>
            <button
              disabled={loading}
              onClick={onClose}
              className="btn btn-error"
              type="button"
            >
              Cancelar
            </button>
          </div>
        </div>
      </dialog>,
      window.document.body,
    )
  )
}

export default ConfirmModal
