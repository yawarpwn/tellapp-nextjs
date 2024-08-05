'use client'

import { Button } from '@/components/ui/button'
import clsx from 'clsx'
import React, { useEffect, useRef } from 'react'
import { createPortal, useFormStatus } from 'react-dom'

export function SubmitButton({ onClose }: { onClose: () => void }) {
  const { pending } = useFormStatus()
  return (
    <>
      <Button type="submit" disabled={pending}>
        <span>Aceptar</span>
        {pending && <span className="loading loading-spinner"></span>}
      </Button>
      <Button type="button" disabled={pending} onClick={onClose}>
        Cancelar
      </Button>
    </>
  )
}

interface Props {
  isOpen: boolean
  onClose: () => void
  onAction: () => void
  title?: string
  children?: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export function ConfirmActionModal(props: Props) {
  const { isOpen, onClose, onAction, title = '¿ Estás seguro ?', children, size = 'sm' } = props
  const modalRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyEscape)
    return () => window.removeEventListener('keydown', handleKeyEscape)
  }, [onClose])

  const modalBoxClass = clsx('modal-box', `max-w-${size}`)

  return (
    isOpen &&
    createPortal(
      <dialog
        className="modal"
        ref={modalRef}
        onMouseDown={event => {
          if (event.target === event.currentTarget) {
            onClose()
          }
        }}
      >
        <form className={modalBoxClass} action={onAction}>
          <header className="py-2">
            <p className="mb-2 text-center">{title}</p>
          </header>
          {children}
          <footer className="flex items-center justify-between">
            <SubmitButton onClose={onClose} />
          </footer>
        </form>
      </dialog>,
      window.document.body,
    )
  )
}
