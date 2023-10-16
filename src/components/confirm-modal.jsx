import { useEffect, useRef } from 'react'
function ConfirmModal({  onCloseModal, children, isOpen, loading }) {
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
      <div className="modal-box max-w-xs flex items-center justify-between">
        {children}
        <button disabled={loading} type="submit" className="btn btn-success">
          {loading && <span className="loading loading-dots loading-sm"></span>}
          Confirmar
        </button>
        <button onClick={onCloseModal} className="btn btn-error" type="button">
          Cancelar
        </button>
      </div>
    </dialog>
  )
}

export default ConfirmModal
