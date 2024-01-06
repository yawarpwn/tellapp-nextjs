import { Input } from '@/ui/components/input'

export function CustomerInputs({ state, customer }) {
	return (
		<div className='flex flex-col gap-4'>
			<Input
				defaultValue={customer?.name}
				name='name'
				labelText={'Nombre'}
				placeholder='Nuevo Cliente S.A.C.'
				type='text'
				errors={state.errors?.name}
				required
			/>
			<Input
				defaultValue={customer?.ruc}
				name='ruc'
				labelText={'Ruc'}
				placeholder='20610555599'
				type='number'
				errors={state.errors?.ruc}
				required
			/>
			<Input
				defaultValue={customer?.address}
				labelText={'Dirección'}
				name='address'
				type='text'
				errors={state.errors?.address}
				placeholder='Av. Fauccett 232 - Callao'
			/>
			<Input
				defaultValue={customer?.phone}
				name='phone'
				labelText={'Telefono'}
				type='number'
				errors={state.errors?.phone}
				placeholder='971 531 019'
			/>
			<Input
				defaultValue={customer?.email}
				name='email'
				labelText={'Email'}
				type='email'
				errors={state.errors?.email}
				placeholder='ventas@example.com'
			/>
		</div>
	)
}
