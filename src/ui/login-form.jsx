'use client'

import { signIn } from '@/lib/actions/auth'
import { useFormState } from 'react-dom'
import { SubmitButton } from './components/submit-button'

export default function LoginForm({ message }) {
	const [state, dispatch] = useFormState(signIn, { message: '', errors: {} })

	return (
		<>
			<form action={dispatch}>
				<div className='flex flex-col gap-2'>
					<div className='form-control'>
						<label htmlFor='email' className='label'>
							<span className='label-text'>Correo</span>
						</label>
						<input
							type='email'
							name='email'
							id='email'
							className='input'
							placeholder='correo@dominio.com'
							required
						/>
						{state.errors?.email && (
							<p className='text-error mt-1'>{state.errors.email[0]}</p>
						)}
					</div>
					<div className='form-control'>
						<label htmlFor='password' className='label'>
							<span className='label-text'>Constraseña</span>
						</label>
						<input
							type='password'
							name='password'
							id='password'
							className='input'
							placeholder='********'
							required
						/>

						{state.errors?.email && (
							<p className='text-error mt-1'>{state.errors.password[0]}</p>
						)}
					</div>
					<SubmitButton className='w-full btn-primary' />
					{message && <p className='text-error'>{message}</p>}
				</div>
			</form>
		</>
	)
}
