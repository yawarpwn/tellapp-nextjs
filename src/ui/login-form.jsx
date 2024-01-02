'use client'

import { createBrowserClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginForm() {
	const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState()
	const router = useRouter()
	const signInWithEmail = async ({ password, email }) => {
		const supabase = createBrowserClient()
		setIsPending(true)
		try {
			const { error } = await supabase.auth.signInWithPassword({
				password,
				email,
			})

			if (error) throw new Error(error)
			router.push('/quotations')
		} catch (error) {
			setError('Credenciales invalidas')
		} finally {
			setIsPending(false)
		}
	}
	const handleSubmit = e => {
		e.preventDefault()
		const formData = new FormData(e.target)
		const email = formData.get('email')
		const password = formData.get('password')
		signInWithEmail({ password, email })
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='form-control'>
					<label htmlFor='email' className='label'>
						<span className='label-text'>Correo</span>
					</label>
					<input
						type='email'
						name='email'
						id='email'
						className='input input-bordered'
						placeholder='correo@dominio.com'
						required
					/>
				</div>
				<div className='form-control'>
					<label htmlFor='password' className='label'>
						<span className='label-text'>Constraseña</span>
					</label>
					<input
						type='password'
						name='password'
						id='password'
						className='input input-bordered'
						placeholder='********'
						required
					/>
				</div>
				{error && (
					<div className='text-error mt-2'>
						<p>{error}</p>
					</div>
				)}
				<button
					disabled={isPending}
					type='submit'
					className='btn btn-primary mt-4 w-full'
				>
					<span>Iniciar Session</span>
					{isPending && <span className='loading loading-dots'></span>}
				</button>
			</form>
		</>
	)
}
