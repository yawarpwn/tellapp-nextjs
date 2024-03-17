'use client'

import { PowerIcon } from '@/icons'
import { signOut } from '@/lib/actions/auth'

function SignOutButton() {
	return (
		<form action={signOut}>
			<button className='inline-block w-full my-2'>
				<div className='w-full flex gap-4 py-3 pl-5 hover:text-white hover:bg-[rgb(27,28,32)] rounded-md'>
					<PowerIcon />
					<span>Salir</span>
				</div>
			</button>
		</form>
	)
}

export default SignOutButton
