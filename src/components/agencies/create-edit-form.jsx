'use client'
import { shootCoffeti } from '@/services/confetti'
import { Input } from '@/components/input'
import SubmitButton from ../ui/submit-action-button'
import Link from 'next/link'
import { useFormState } from 'react-dom'

const initialState = {
	message: null,
	errors: {},
}
export default function CreateEditAgencyForm({ agency, action }) {
	const [state, dispatch] = useFormState(action, initialState)
	const destinations = agency?.destinations?.toString() || ''

	return (
		<form
			action={dispatch}
		>
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
				defaultValue={destinations}
				type='text'
				errors={state.errors?.destinations}
			/>
			<input name='id' type='hidden' defaultValue={agency?.id} />
			{state.message && (
				<div className='text-error mt-1'>
					{state.message}
				</div>
			)}

			<footer className='mt-4 flex justify-between'>
				<Link href={'/products'} className='btn'>
					Cancelar
				</Link>
				<SubmitButton action={action} />
			</footer>
		</form>
	)
}
