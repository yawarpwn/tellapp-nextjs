import { createServerClient } from '@/lib/supabase'
import Navbar from '@/ui/header/navbar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function LayoutDashboar({ children }) {
	const cookieStore = cookies()

	const supabase = createServerClient(cookieStore)
	const { data: { session } } = await supabase.auth.getSession()

	if (!session) {
		redirect('/')
	}

	return (
		<>
			<div className='max-w-3xl mx-auto px-4 md:px-6'>
				<Navbar />
				<main className='pb-4'>{children}</main>
			</div>
		</>
	)
}

export default LayoutDashboar
