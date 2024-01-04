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
		<header className='fixed start-0 end-0 z-30 h-[var(--nav-height)] bg-base-100/50 backdrop-blur border-b border-b-base-300 '>
			<div className='flex items-center justify-between w-full h-full'>
				<div className='flex items-center gap-2'>
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
			{isMobileMenuOpen
				&& createPortal(
					<Sidebar onClose={closeMobileMenu} isOpen={isMobileMenuOpen} />,
					document.body,
				)}
		</header>
	)
}

export default Navbar
