'use client'
import { useEffect, useRef } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

function SubmitButton({ onClose }) {
  const { pending } = useFormStatus()

  return (
    <>
      <button disabled={pending} type="submit" className="btn">
        {pending ? (
          <>
            <span className="loading loading-dots"></span>
          </>
        ) : (
          <>Aceptar</>
        )}
      </button>
      <button
        disabled={pending}
        className="btn btn-error"
        type="button"
        onClick={onClose}
      >
        Cancelar
      </button>
    </>
  )
}

export default function ConfirmActionModal({
  children,
  action,
  maxWidthModal = 'lg',
  openButtonContent = <span>open </span> ,
  openButtonVariant = 'primary',
  message = 'Default message on modal',
}) {
  const modalRef = useRef(null)
  const formRef = useRef(null)

  const openModal = () => {
    modalRef.current?.showModal()
  }

  const closeModal = () => {
    modalRef.current?.close()
  }

  const onAction = async (formData) => {
    await action(formData)
    formRef.current?.reset()
    closeModal()
  }

  return (
    <>
      <button className={`btn btn-${openButtonVariant}`} onClick={openModal}>
        {openButtonContent}
      </button>
      <dialog ref={modalRef} className="modal">
        <div className={`modal-box max-w-${maxWidthModal}`}>
          <p className="mb-4 text-center">{message}</p>
          <form ref={formRef} action={onAction}>
            {children}
            <div className="flex justify-between mt-4">
              <SubmitButton onClose={closeModal} />
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close Modal</button>
        </form>
      </dialog>
    </>
  )
}
