import { SIGNALS_CATEGORIES } from '@/constants'
import { updateSignal } from '@/lib/actions/signals'
import type { Signal } from '@/types'
import { Input } from '@/ui/components/input'
import { Modal } from '@/ui/modal'
import { ImageIcon, PlusIcon } from 'lucide-react'
import React, { useState, useTransition } from 'react'

interface Props {
	signal: Signal
	onCloseModal: () => void
	isOpenModal: boolean
}
export function SignalFormModal(
	{ signal, onCloseModal, isOpenModal }: Props,
) {
	const [isPending, startTransition] = useTransition()
	const [imageUrl, setImageUrl] = useState<string | null>(
		signal.url,
	)

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		startTransition(async () => {
			await updateSignal(formData)
			onCloseModal()
		})
	}

	const handleImageUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			// Esta función se ejecuta cuando la lectura del archivo se completa
			reader.onload = () => {
				setImageUrl(reader.result as string) // Establece la URL de la imagen en el estado
			}
			reader.readAsDataURL(file) // Lee el archivo como una URL de datos
		}
	}

	const clearImage = () => {
		setImageUrl(null)
	}

	return (
		<Modal
			title='Actualizar Señal'
			isOpen={isOpenModal}
			onClose={onCloseModal}
		>
			<form
				onSubmit={handleSubmit}
			>
				<input name='id' type='hidden' value={signal.id} />
				<input name='publicId' type='hidden' value={signal.public_id} />
				<div className='grid grid-cols-12 gap-4'>
					<div className='col-span-12 flex justify-center relative bg-base-200 p-4'>
						<div className='h-[250px] w-full'>
							{imageUrl
								? (
									<>
										<button
											onClick={clearImage}
											className='btn  absolute top-0 right-0'
											type='button'
										>
											Eliminar
										</button>
										<img
											className='w-full h-full object-contain p-4'
											src={imageUrl}
											alt={signal.name}
										/>
									</>
								)
								: (
									<div className='flex items-center justify-center w-full h-full'>
										<label
											className={`
										mb-2 text-sm font-medium h-64 w-full flex items-center 
                    justify-center bg-base-200  border-4 border-base-300 rounded-[1.5rem] 
                    border-dashed cursor-pointer hover:bg-base-300 hover:border-zinc-600
`}
										>
											<div className='flex flex-col items-center text-zinc-600 p-8'>
												<div className='relative'>
													<span className='absolute -top-1 -left-1 w-8 h-8 rounded-full bg-white flex items-center justify-center'>
														<PlusIcon className='text-primary' />
													</span>
													<ImageIcon className='w-14 h-14' />
												</div>
												<h4 className='text-xl font-bold mt-4'>
													Arrastra y suelta las imagenes o{' '}
													<span className='text-primary'>explora</span>
												</h4>
												<p className='text-xs mt-2 text-center'>
													La imagen debe estar en formato JPEG, JPG, PNG
												</p>
											</div>
											<input
												className='hidden'
												name='fileImage'
												type='file'
												onChange={handleImageUpload}
											/>
										</label>
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
					<div className='col-span-12'>
						<Input
							required
							name='code'
							labelText='Codigo'
							type='text'
							defaultValue={signal?.code.toUpperCase()}
							placeholder='XVX60'
							ariaLabelledby={'code-error'}
						/>
					</div>
					<div className='col-span-12 flex justify-between items-center'>
						<label htmlFor='category' className='text-base-content/70'>
							Categoria:
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
