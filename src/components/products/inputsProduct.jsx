import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PRODUCT_CATEGORIES } from '@/constants'

export function InputsProduct({ state, product }) {
	return (
		<div className='grid grid-cols-12 gap-4'>
			<div className='col-span-12'>
				<Textarea
					required
					name='description'
					placeholder='Descripcion de producto'
					autoFocus
					as='textarea'
					defaultValue={product?.description}
					ariaLabelledby={'description-error'}
					errors={state.errors?.description}
				/>
			</div>
			<div className='col-span-6'>
				<Input
					required
					name='code'
					labelText='Codigo'
					type='text'
					defaultValue={product?.code}
					placeholder='XVX60'
					errors={state.errors?.code}
					ariaLabelledby={'code-error'}
				/>
			</div>
			<div className='col-span-6'>
				<Input
					required
					name='unit_size'
					labelText='U/M'
					type='text'
					defaultValue={product?.unit_size}
					errors={state.errors?.unit_size}
					placeholder='30x30cm'
					ariaLabelledby={'unit-size-error'}
				/>
			</div>
			<div className='col-span-6'>
				<Input
					required
					name='cost'
					labelText='Costo'
					type='number'
					defaultValue={product?.cost}
					placeholder='10.00'
					step='0.1'
					errors={state.errors?.cost}
					ariaLabelledby={'cost-error'}
				/>
			</div>
			<div className='col-span-6'>
				<Input
					required
					name='price'
					labelText='Precio'
					type='number'
					defaultValue={product?.price}
					step='0.5'
					placeholder='100'
					errors={state.errors?.price}
					ariaLabelledby={'price-error'}
				/>
			</div>
			<input type='hidden' name='id' defaultValue={product?.id} />
			<div className='col-span-12 flex justify-between items-center'>
				<select
					id='category'
					name='category'
					className='select w-full'
					defaultValue={product?.category || ''}
					errors={state.errors?.category}
					required
				>
					<option value='' disabled>
						Seleccionar Categoria
					</option>
					{Object.values(PRODUCT_CATEGORIES).map(value => (
						<option value={value} key={value}>
							{value}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
