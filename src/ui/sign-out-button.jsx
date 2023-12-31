'use client'

import { PowerIcon } from '@/icons'
import { logout } from '@/lib/actions/auth'
import { createBrowserClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

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
	const handleSubmit = async (e) => {
		e.preventDefault()
		logout()
	}

	// const [isPending, startTransition] = useTransition()
	//
	// const handleSubmit = async () => {
	// 	startTransition(async () => {
	// 		await logout()
	// 	})
	// }
	return (
		<form onSubmit={handleSubmit}>
			<button className='btn btn-sm'>
				<PowerIcon size={20} />
			</button>
		</form>
	)
}

export default SignOutButton
