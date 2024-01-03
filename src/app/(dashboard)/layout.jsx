import { NAVIGATION } from '@/constants'
import { createServerClient } from '@/lib/supabase'
import Navbar from '@/ui/header/navbar'
import { Sidebar } from '@/ui/sidebar'
import SignOutButton from '@/ui/sign-out-button'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function LayoutDashboar({ children }) {
	const cookieStore = cookies()

	const supabase = createServerClient(cookieStore)
	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/')
	}

	return (
		<>
			<div className='max-w-3xl mx-auto px-2 lg:px-6 relative flex flex-col gap-4'>
				<div className='lg:hidden'>
					<Navbar />
				</div>
				<main className='pb-4 lg:pt-8'>{children}</main>
				<div className='hidden lg:block'>
					<Sidebar />
				</div>
			</div>
		</>
	)
}

export default LayoutDashboar
