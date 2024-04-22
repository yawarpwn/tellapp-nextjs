'use client'

import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn, signOut } from '@/lib/actions/auth'
import { useFormState } from 'react-dom'

export function LoginForm({ message }: { message: string }) {
	const [state, dispatch] = useFormState(signIn, { message: '', errors: {} })

	return (
		<>
			<form action={dispatch}>
				<div className='flex flex-col gap-4'>
					<div className='grid gap-4'>
						<Label htmlFor='email' className='label'>
							Correo
						</Label>
						<Input
							type='email'
							name='email'
							id='email'
							className=''
							placeholder='correo@dominio.com'
							required
						/>
						{state?.errors?.email && (
							<p className='text-destructive text-xs'>
								{state?.errors?.email[0]}
							</p>
						)}
					</div>
					<div className='grid gap-4'>
						<Label htmlFor='password' className='label'>
							<span className='label-text'>Constraseña</span>
						</Label>
						<Input
							type='password'
							name='password'
							id='password'
							className='input'
							placeholder='********'
							required
						/>

						{state?.errors?.password && (
							<p className='text-error mt-1'>{state?.errors?.password[0]}</p>
						)}
						<p className='text-[#6b66ff] text-xs'>
							<a href='#'>
								Olvidates tu contraseña ?
							</a>
						</p>
					</div>
					<SubmitButton />
					<p className='text-xs text-center'>
						Necesitas una cuenta?{' '}
						<a href='#' className='text-[#6b66ff] '>Registrate</a>
					</p>
					{message && (
						<div className='border border-destructive text-destructive p-2 rounded-sm'>
							<p className='text-xs text-center'>{message}</p>
						</div>
					)}
				</div>
			</form>
		</>
	)
}
