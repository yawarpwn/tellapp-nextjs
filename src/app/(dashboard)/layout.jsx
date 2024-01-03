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
			<div className='max-w-3xl mx-auto px-2 md:px-6 relative flex flex-col gap-4'>
				<div className='xl:hidden'>
					<Navbar />
				</div>
				<main className='pb-4 xl:pt-8'>{children}</main>
				<div className='hidden xl:block'>
					<Sidebar />
				</div>
			</div>
		</>
	)
}

export default LayoutDashboar
