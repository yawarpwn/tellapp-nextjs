'use client'
import { NAVIGATION } from '@/constants'
import { ArrowLeft, BarsIcon } from '@/icons'
import { XIcon } from '@/icons'
import Link from 'next/link'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import SignOutButton from '../sign-out-button'

function Sidebar({ onClose }) {
	return (
		<aside>
			<nav className='fixed top-0 left-0 h-full bg-base-200 w-[300px] z-50'>
				<div className='h-full flex flex-col justify-between'>
					<button
						className='absolute btn top-2 right-2'
						onClick={onClose}
					>
						<XIcon />
					</button>
					<ul className='p-8 flex flex-col gap-8'>
						{NAVIGATION.map(({ href, title, icon: Icon }) => (
							<li key={title}>
								<Link href={href} legacyBehavior>
									<a
										onClick={() => onClose()}
										className='flex gap-2 group'
									>
										<span className='text-primary'>
											<Icon />
										</span>
										<span className='group-hover:text-primary-content'>
											{title}
										</span>
									</a>
								</Link>
							</li>
						))}
					</ul>
					<SignOutButton />
				</div>
			</nav>
			<div
				onMouseDown={() => {
					onClose()
				}}
				className='fixed inset-0 bg-black/80 z-40'
			>
			</div>
		</aside>
	)
}

function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const openMenuMobile = () => setIsMobileMenuOpen(true)
	const closeMobileMenu = () => setIsMobileMenuOpen(false)
	return (
		<>
			<header className='relative h-16'>
				<div className='navbar fixed left-0 z-30 bg-base justify-between border-b border-b-primary/30  bg-base-200/80 backdrop-blur'>
					<div className='gap-2'>
						<Link href='/quotations' className='btn btn-sm btn-ghost'>
							<ArrowLeft />
						</Link>
						<span>Volver</span>
					</div>
					<button
						onClick={openMenuMobile}
						className='btn btn-sm btn-ghost'
					>
						<BarsIcon />
					</button>
				</div>
			</header>
			{isMobileMenuOpen
				&& createPortal(<Sidebar onClose={closeMobileMenu} />, document.body)}
			<aside>
			</aside>
		</>
	)
}

export default Navbar
