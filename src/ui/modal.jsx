'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal(
	{ isOpen, onClose, title, children, size = 'sm' },
) {
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
		isOpen
		&& createPortal(
			<dialog
				className='modal'
				ref={modalRef}
				onMouseDown={event => {
					if (event.target === event.currentTarget) {
						onClose()
					}
				}}
			>
				<div className={`modal-box max-w-${size}`}>
					{title && (
						<header className='py-2'>
							<p className='text-center mb-2'>{title}</p>
						</header>
					)}
					{children}
				</div>
			</dialog>,
			window.document.body,
		)
	)
}
