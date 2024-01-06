'use client'

import { PowerIcon } from '@/icons'
import { createBrowserClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

function SignOutButton() {
	const router = useRouter()

	const logout = async () => {
		try {
			const supabase = createBrowserClient()
			await supabase.auth.signOut()
			router.push('/')
		} catch (error) {
			console.log('error', error)
		}
	}
	const handleSubmit = async e => {
		e.preventDefault()
		logout()
	}

	return (
		<form onSubmit={handleSubmit}>
			<button className='btn btn-sm'>
				<span className='text-error'>
					<PowerIcon />
				</span>
				<span>Salir</span>
			</button>
		</form>
	)
}

export default SignOutButton
