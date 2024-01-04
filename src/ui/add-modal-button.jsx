'use client'
import { CATEGORIES } from '@/constants'
import { PlusIcon } from '@/icons'
import Input from '@/ui/components/input'
import Modal from '@/ui/modal'
import { useState } from 'react'

function UpdateEditProductForm({ product }) {
	return (
		<form>
			<Input
				required
				name='description'
				placeholder='Descripcion de producto'
				autoFocus
				as='textarea'
				defaultValue={product?.description}
				ariaLabelledby={'description-error'}
				// errors={state.errors?.description}
			/>
			<Input
				required
				name='code'
				labelText='Codigo'
				type='text'
				defaultValue={product?.code}
				placeholder='Descripcion de producto'
				// errors={state.errors?.code}
				ariaLabelledby={'code-error'}
			/>
			<div className='flex gap-4'>
				<Input
					required
					name='price'
					labelText='Precio'
					type='number'
					defaultValue={product?.price}
					step='0.5'
					placeholder='100'
					// errors={state.errors?.price}
					ariaLabelledby={'price-error'}
				/>

				<Input
					required
					name='cost'
					labelText='Costo'
					type='number'
					defaultValue={product?.cost}
					placeholder='10.00'
					// errors={state.errors?.cost}
					ariaLabelledby={'cost-error'}
				/>
			</div>
			<div className='flex items-center gap-2 '>
				<Input
					required
					name='unit_size'
					labelText='Unidad / Medida'
					type='text'
					defaultValue={product?.unit_size}
					// errors={state.errors?.unit_size}
					placeholder='30x30cm'
					ariaLabelledby={'unit-size-error'}
				/>
				<input type='hidden' name='id' defaultValue={product?.id} />
				<select
					name='category'
					className='select mt-2'
					defaultValue={product?.category || ''}
					// errors={state.errors?.category}
					required
				>
					<option value='' disabled>
						Categoria
					</option>
					{Object.values(CATEGORIES).map(value => (
						<option value={value} key={value}>
							{value}
						</option>
					))}
				</select>
			</div>

			<footer className='mt-4 flex justify-between'>
				<button href={'/products'} className='btn'>
					Cancelar
				</button>
				<button className='btn'>
					Aceptar
				</button>
			</footer>
		</form>
	)
}

const AddModalButton = () => {
	const [isOpenModal, setIsOpenModal] = useState()
	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)

	return (
		<>
			<button onClick={openModal} className='btn btn-sm btn-primary'>
				<PlusIcon />
				<span className=''>Crear</span>
			</button>
			<Modal isOpen={isOpenModal} onClose={closeModal}>
				<UpdateEditProductForm />
			</Modal>
		</>
	)
}

export { AddModalButton }
