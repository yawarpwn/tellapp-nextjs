'use client'

import { createCustomer } from '@/lib/actions/customers'
import Input from '@/ui/components/input'
import Link from 'next/link'
import React from 'react'
import { useFormState } from 'react-dom'
import SubmitActionButton from '../submit-action-button'

const initialState = {
	message: null,
	errors: {},
}
function Form() {
	const [state, dispatch] = useFormState(createCustomer, initialState)
	return (
		<form action={dispatch}>
			<Input
				name="name"
				labelText={'Nombre'}
				placeholder="Nuevo Cliente S.A.C."
				type="text"
				errors={state.errors?.name}
				required
			/>
			<Input name="ruc" labelText={'Ruc'} placeholder="20610555599" type="number" errors={state.errors?.ruc} required />
			<Input
				labelText={'Dirección'}
				name="address"
				type="text"
				errors={state.errors?.address}
				placeholder="Av. Fauccett 232 - Callao"
			/>

			<Input name="phone" labelText={'Telefono'} type="number" errors={state.errors?.phone} placeholder="971 531 019" />
			<Input
				name="email"
				labelText={'Email'}
				type="email"
				errors={state.errors?.email}
				placeholder="ventas@example.com"
			/>
			{/* {state?.message && <div className='text-red-500 text-sm'>{state.message}</div>} */}
			<footer className="mt-4 flex justify-between">
				<Link href={'/customers'} className="btn">
					Cancelar
				</Link>
				<SubmitActionButton />
			</footer>
		</form>
	)
}

export default Form
