import { NAVIGATION } from '@/constants'
import { createServerClient } from '@/lib/supabase'
import Navbar from '@/ui/header/navbar'
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
				<aside className='hidden xl:block'>
					<nav className='fixed top-0 left-0 h-full bg-base-200 w-[300px] z-50'>
						<div className='flex flex-col h-full justify-between'>
							<ul className='p-8 flex flex-col gap-8'>
								{NAVIGATION.map(({ href, title, icon: Icon }) => (
									<li key={title}>
										<Link href={href} legacyBehavior>
											<a className='flex gap-2 hover:text-primary'>
												<Icon />
												<span>{title}</span>
											</a>
										</Link>
									</li>
								))}
							</ul>
							<SignOutButton />
						</div>
					</nav>
				</aside>
			</div>
		</>
	)
}

export default LayoutDashboar
