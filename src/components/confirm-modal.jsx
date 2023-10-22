import { useEffect, useRef } from 'react'
function ConfirmModal({
  onCloseModal,
  children,
  isOpen,
  loading,
  message = ' Default message to show in Confirm Modal',
  onConfirm = () => {},
}) {
  const modalRef = useRef()
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpen, modalRef])

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box max-w-xs flex flex-col gap-4 ">
        <p className="text-center">
          {message}
        </p>
        {children}
        <div className="flex justify-between gap-2">
          <button
            onClick={onConfirm}
            disabled={loading}
            type="submit"
            className="btn btn-success"
          >
            {loading && (
              <span className="loading loading-dots loading-sm"></span>
            )}
            Confirmar
          </button>
          <button
            onClick={onCloseModal}
            className="btn btn-error"
            type="button"
          >
            Cancelar
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ConfirmModal
