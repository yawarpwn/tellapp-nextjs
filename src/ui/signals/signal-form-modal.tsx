import { SIGNALS_CATEGORIES } from '@/constants'
import type { Signal } from '@/types'
import { Input } from '@/ui/components/input'
import { Modal } from '@/ui/modal'

interface Props {
	signal: Signal
	onCloseModal: () => void
	isOpenModal: boolean
}
export function SignalFormModal(
	{ signal, onCloseModal, isOpenModal }: Props,
) {
	return (
		<Modal
			isOpen={isOpenModal}
			onClose={onCloseModal}
			title={'Editar Senal'}
		>
			<form>
				<div className='grid grid-cols-12 gap-4'>
					<div className='col-span-12 flex justify-center '>
						<img src={signal.url} alt={signal.name} />
					</div>
					<div className='col-span-12'>
						<Input
							labelText='Nombre'
							required
							name='description'
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
					<button className='btn '>Aceptar</button>
					<button onClick={onCloseModal} className='btn '>Cancelar</button>
				</div>
			</form>
		</Modal>
	)
}
