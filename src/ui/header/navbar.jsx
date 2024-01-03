'use client'

import { ArrowLeft, BarsIcon } from '@/icons'
import { Sidebar } from '@/ui/sidebar'
import Link from 'next/link'
import { useState } from 'react'
import { createPortal } from 'react-dom'

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
				&& createPortal(
					<Sidebar onClose={closeMobileMenu} isOpen={isMobileMenuOpen} />,
					document.body,
				)}
			<aside>
			</aside>
		</>
	)
}

export default Navbar
