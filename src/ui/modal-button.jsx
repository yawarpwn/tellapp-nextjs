'use client'
import { PlusIcon } from '@/icons'
import { EditIcon } from '@/icons'
import { Modal } from '@/ui/modal'
import { useState, useTransition } from 'react'

const initialState = {
	message: null,
	errors: {},
}

function UpdateEditForm(
	{ action, closeModal, renderInputs, itemToEdit },
) {
	const [isPending, startTransition] = useTransition()
	const [state, setState] = useState(initialState)

	const handleSubmit = (event) => {
		event.preventDefault()

		const formData = new FormData(event.target)

		startTransition(async () => {
			const results = await action(initialState, formData)
			if (results?.errors) {
				setState(prev => ({ ...prev, ...results }))
				return
			}

			closeModal()
		})
	}

	return (
		<form onSubmit={handleSubmit}>
			{renderInputs(state, itemToEdit)}
			{state?.message && (
				<div className='col-span-12 mt-2 text-error'>{state.message}</div>
			)}
			<footer className='col-span-12 flex justify-between mt-2'>
				<button disabled={isPending} type='submit' className='btn'>
					{isPending && <span className='loading loading-spinner'></span>}
					Aceptar
				</button>
				<button
					disabled={isPending}
					onClick={closeModal}
					type='button'
					className='btn'
				>
					Cancelar
				</button>
			</footer>
		</form>
	)
}

export function ModalButton({ action, itemToEdit, renderInputs }) {
	const [isOpenModal, setIsOpenModal] = useState()
	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)

	return (
		<>
			{!itemToEdit
				? (
					<button onClick={openModal} className='btn btn-sm btn-primary'>
						<PlusIcon />
						<span className=''>Crear</span>
					</button>
				)
				: (
					<button onClick={openModal}>
						<EditIcon />
					</button>
				)}

			<Modal isOpen={isOpenModal} onClose={closeModal}>
				<UpdateEditForm
					action={action}
					itemToEdit={itemToEdit}
					renderInputs={renderInputs}
					closeModal={closeModal}
				>
				</UpdateEditForm>
			</Modal>
		</>
	)
}
