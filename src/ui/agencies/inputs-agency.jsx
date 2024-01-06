import { Input } from '@/ui/components/input'

export function InputsAgency({ agency, state }) {
	return (
		<div className='flex flex-col gap-4'>
			<Input
				name='company'
				labelText={'Agencia'}
				type='text'
				placeholder='Agencia Lorito S.R.L.'
				required
				defaultValue={agency?.company}
				errors={state.errors?.company}
			/>
			<Input
				labelText={'Ruc'}
				placeholder='20610666636'
				name='ruc'
				type='number'
				defaultValue={agency?.ruc}
				required
				errors={state.errors?.ruc}
			/>

			<Input
				labelText={'Dirección'}
				name='address'
				placeholder='Dirección'
				type='text'
				defaultValue={agency?.address}
				errors={state.errors?.address}
			/>

			<Input
				labelText={'Telefono'}
				name='phone'
				placeholder='99888777'
				type='number'
				defaultValue={agency?.phone}
				errors={state.errors?.phone}
			/>
			<Input
				labelText={'Destinos'}
				name='destinations'
				placeholder='Huanuco, Cajamarca, Chiclayo'
				defaultValue={agency?.destinations}
				type='text'
				errors={state.errors?.destinations}
			/>
			<input name='id' type='hidden' defaultValue={agency?.id} />
		</div>
	)
}
