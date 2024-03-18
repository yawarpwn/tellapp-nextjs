'use client'
import { MenuIcon } from '@/icons'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { MobileSidebar } from './mobile-sidebar'
export function MobileMenu() {
	const [showMobileMenu, setShowMobileMenu] = useState(false)

	const closeMobileMenu = () => setShowMobileMenu(false)
	const openMobileMenu = () => setShowMobileMenu(true)

	return (
		<>
			<button className='btn btn-sm' onClick={openMobileMenu}>
				<MenuIcon />
			</button>
			{showMobileMenu && createPortal(
				<MobileSidebar
					showMobileMenu={showMobileMenu}
					onCloseMobileMenu={closeMobileMenu}
				/>,
				document.body,
			)}
		</>
	)
}
