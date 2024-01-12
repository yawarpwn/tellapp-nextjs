import { createServerClient } from '@/lib/supabase'
import Navbar from '@/ui/header/navbar'
import { Sidebar } from '@/ui/sidebar'
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
			{/* Root */}
			<div className='drawer lg:drawer-open'>
				<input type='checkbox' id='drawer' className='drawer-toggle'>
				</input>

				{/* Main Content */}
				<div className='drawer-content'>
					<div className='max-w-3xl w-full mx-auto flex flex-col gap-4'>
						<Navbar />
						<main className='pt-[calc(var(--nav-height)+1rem)] lg:pt-4 px-4'>
							{children}
						</main>
					</div>
				</div>

				{/* Sidebar */}
				<div className='drawer-side z-40'>
					<label
						htmlFor='drawer'
						className='drawer-overlay'
						aria-label='Close Menu'
					>
					</label>

					{/* Sidebar Content */}
					<Sidebar />
				</div>
			</div>
		</>
	)
}

export default LayoutDashboar
