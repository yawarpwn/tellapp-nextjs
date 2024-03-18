import { createServerClient } from '@/lib/supabase'
import { Logo } from '@/ui/components/logo'
import { MobileMenu } from '@/ui/components/mobile-menu'
import { Sidebar } from '@/ui/components/sidebar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

async function LayoutDashboar({ children }: { children: React.ReactNode }) {
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
			<div className='grid grid-cols-[0px_auto] md:grid-cols-[16.875rem,auto]'>
				{/* Sidebar */}
				<div className=''>
					<div className='h-screen [position:unset] md:sticky top-0'>
						<header
							id='sidebar-mobile'
							className='absolute bg-base-100 flex justify-between  w-full h-auto z-10 py-4 px-6 md:hidden'
						>
							<Logo />
							<MobileMenu />
						</header>
						<div className='hidden md:block'>
							<Sidebar />
						</div>
					</div>
				</div>
				{/* Main Content */}
				<div className='min-w-full max-w-[100vw] mt-4'>
					<div>
						<main className='pt-[calc(var(--nav-height)+1rem)] lg:pt-4 px-4'>
							{children}
						</main>
						<footer className='h-4'></footer>
					</div>
				</div>
				{/* Main Content */}
			</div>
		</>
	)
}

export default LayoutDashboar
