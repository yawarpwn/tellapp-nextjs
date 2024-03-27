import { Sidebar } from '@/components/sidebar'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
interface Props {
	showMobileMenu: boolean
	onCloseMobileMenu: () => void
}
export function MobileSidebar(props: Props) {
	const { showMobileMenu, onCloseMobileMenu } = props
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		if (showMobileMenu) {
			document.body.style.overflow = 'hidden'
			setVisible(true)
		}

		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [showMobileMenu])

	const closeModal = () => {
		setVisible(false)
		setTimeout(() => {
			onCloseMobileMenu()
		}, 300)
	}
	return (
		<div className='fixed left-0 top-0 w-[100vw] h-dvh z-50 flex justify-center'>
			<div
				role='dialog'
				id='modal-mobile '
				className={cn(
					'fixed top-0 left-0 bottom-0 w-full duration-300 transition-transform ease-in-out translate-x-0 ',
					visible ? 'translate-x-0' : 'translate-x-[-100%]',
				)}
			>
				<Sidebar onClose={closeModal} />
			</div>
		</div>
	)
}
