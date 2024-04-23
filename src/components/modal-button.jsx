'use client'
import { Modal } from '@/components/modal'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@/icons'
import { EditIcon } from '@/icons'
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
		<form className='modal-form ' onSubmit={handleSubmit}>
			{renderInputs(state, itemToEdit)}
			{state?.message && (
				<div className='col-span-12 mt-2 text-error'>{state.message}</div>
			)}
			<footer className='col-span-12 flex gap-4 justify-between mt-2'>
				<Button
					disabled={isPending}
					type='submit'
					variant='primay'
				>
					{isPending && <span className='loading loading-spinner'></span>}
					Aceptar
				</Button>
				<button
					disabled={isPending}
					onClick={closeModal}
					type='button'
					className='btn btn-secondary flex-1'
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
					<Button onClick={openModal} variant='primary'>
						<PlusIcon />
						<span className=''>Crear</span>
					</Button>
				)
				: (
					<Button
						size='icon'
						className='btn btn-sm'
						onClick={openModal}
					>
						<EditIcon size={20} />
					</Button>
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
