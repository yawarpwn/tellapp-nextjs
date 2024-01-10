import { createServerClient } from '@/lib/supabase'
import Navbar from '@/ui/header/navbar'
import { cookies } from 'next/headers'
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
			<div className='max-w-3xl min-h-screen mx-auto px-2 md:px-4 relative flex flex-col'>
				<Navbar />
				<main className='pt-[calc(var(--nav-height)_+_1rem)] pb-[3vh]'>
					{children}
				</main>
			</div>
		</>
	)
}

export default LayoutDashboar
