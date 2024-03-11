import { SIGNALS_CATEGORIES } from '@/constants'
import { updateSignal } from '@/lib/actions/signals'
import type { Signal } from '@/types'
import { Input } from '@/ui/components/input'
import { Modal } from '@/ui/modal'
import React, { useTransition } from 'react'

interface Props {
	signal: Signal
	onCloseModal: () => void
	isOpenModal: boolean
}
export function SignalFormModal(
	{ signal, onCloseModal, isOpenModal }: Props,
) {
	const [viewImage, setViewImage] = React.useState(true)
	const [isPending, startTransition] = useTransition()

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		startTransition(async () => {
			await updateSignal(signal, formData)
			onCloseModal()
		})
	}

	return (
		<Modal
			isOpen={isOpenModal}
			onClose={onCloseModal}
			title={'Editar Senal'}
		>
			<form
				onSubmit={handleSubmit}
			>
				<input name='id' type='hidden' value={signal.id} />
				<input name='publicId' type='hidden' value={signal.public_id} />
				<div className='grid grid-cols-12 gap-4'>
					<div className='col-span-12 flex justify-center relative'>
						<div className='h-[250px] w-full'>
							{viewImage
								? (
									<>
										<button
											onClick={() => setViewImage(false)}
											className='btn btn-circle absolute top-0 right-0'
											type='button'
										>
											X
										</button>
										<img
											className='w-full h-full object-contain p-4'
											src={signal.url}
											alt={signal.name}
										/>
									</>
								)
								: (
									<div className='flex items-center justify-center w-full h-full'>
										<input
											className='file-input file-input-primary'
											name='fileImage'
											type='file'
										/>
									</div>
								)}
						</div>
					</div>
					<div className='col-span-12'>
						<Input
							labelText='Nombre'
							required
							name='name'
							placeholder='Descripcion de signalo'
							defaultValue={signal?.name}
							ariaLabelledby={'description-error'}
						/>
					</div>
					<div className='col-span-6'>
						<Input
							required
							name='code'
							labelText='Codigo'
							type='text'
							defaultValue={signal?.code}
							placeholder='XVX60'
							ariaLabelledby={'code-error'}
						/>
					</div>
					<div className='col-span-6 flex justify-between items-center'>
						<label htmlFor='category' className='text-base-content/70'>
							Selecionar:
						</label>
						<select
							id='category'
							name='category'
							className='select'
							defaultValue={signal?.category || ''}
							required
						>
							<option value='' disabled>
								Categoria
							</option>
							{Object.entries(SIGNALS_CATEGORIES).map(([key, value]) => (
								<option value={key} key={key}>
									{value}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className='mt-4 flex gap-2 justify-between'>
					<button disabled={isPending} type='submit' className='btn '>
						<span>
							Aceptar
						</span>
						{isPending && <span className='loading loading-spinner'></span>}
					</button>
					<button
						disabled={isPending}
						type='button'
						onClick={onCloseModal}
						className='btn '
					>
						Cancelar
					</button>
				</div>
			</form>
		</Modal>
	)
}
