import { Sidebar } from '@/ui/components/sidebar'
import { cn } from '@/utils'
import { useEffect } from 'react'
interface Props {
	showMobileMenu: boolean
	onCloseMobileMenu: () => void
}
export function MobileSidebar(props: Props) {
	const { showMobileMenu, onCloseMobileMenu } = props

	useEffect(() => {
		if (showMobileMenu) {
			document.body.style.overflow = 'hidden'
		}

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [showMobileMenu])
	return (
		<div className='fixed left-0 top-0 w-[100vw] h-dvh z-50 flex justify-center'>
			<div
				role='dialog'
				id='modal-mobile '
				className={cn(
					'fixed top-0 left-0 bottom-0 w-full transition-all translate-x-[-100px]',
					showMobileMenu && 'translate-x-0',
				)}
			>
				<Sidebar onClose={onCloseMobileMenu} />
			</div>
		</div>
	)
}
