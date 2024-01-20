'use client'

import { PowerIcon } from '@/icons'
import { signOut } from '@/lib/actions/auth'

function SignOutButton() {
	return (
		<form action={signOut}>
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
