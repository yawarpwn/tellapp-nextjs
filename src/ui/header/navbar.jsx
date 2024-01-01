'use client'
import { NAVIGATION } from '@/constants'
import { BarsIcon } from '@/icons'
import { XIcon } from '@/icons'
import Link from 'next/link'

import { useState } from 'react'
import SignOutButton from '../sign-out-button'

function Navbar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const openMenuMobile = () => setMobileMenuOpen(true)
	const closeMobileMenu = () => setMobileMenuOpen(false)
	return (
		<>
			<header className='mb-4'>
				<div className='navbar bg-base justify-between'>
					<button
						onClick={openMenuMobile}
						className='btn btn-ghost gap-2'
					>
						<BarsIcon />
					</button>
					<SignOutButton />
				</div>
			</header>
			<aside>
				{mobileMenuOpen && (
					<>
						<nav className='fixed top-0 left-0 h-full bg-base-200 w-[300px] z-50'>
							<button
								className='absolute btn top-2 right-2'
								onClick={closeMobileMenu}
							>
								<XIcon />
							</button>
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
						</nav>
						<div
							onMouseDown={() => {
								closeMobileMenu()
							}}
							className='fixed inset-0 bg-base-300/80 backdrop-blur-sm z-40'
						>
						</div>
					</>
				)}
			</aside>
		</>
	)
}

export default Navbar
