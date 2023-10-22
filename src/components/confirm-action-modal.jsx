'use client'
import { useEffect, useRef } from "react"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export default function ConfirmActionModal({
  isOpen,
  onClose,
  message = 'Default message on modal',
}) {
  const { pending } = useFormStatus()
  const modalRef = useRef(null)
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpen])
  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box max-w-xs">
        <p className="mb-4 text-center">{message}</p>
        <div className="flex justify-between">
          <button disabled={pending} className="btn btn-success" type="submit">
            {pending ? (
              <span className="loading loading-dots"></span>
            ) : (
              'Confirmar'
            )}
          </button>
          <button
            disabled={pending}
            className="btn btn-error"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </button>
        </div>
      </div>
    </dialog>
  )
}
