'use client'

import { NAVIGATION } from '@/constants'
import { MenuIcon } from '@/icons'
import SignOutButton from '@/ui/sign-out-button'
import { cn } from '@/utils'
import { XIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'
interface Props {
	isOpen?: boolean
	onClose?: () => void
	onOpen?: () => void
}

export function Sidebar(props: Props) {
	const { isOpen = false, onClose } = props
	const pathname = usePathname()

	return (
		<aside
			style={{ scrollbarWidth: 'thin' }}
			className='flex w-full md:w-[16.875rem] bg-base-100 flex-col h-dvh border-r border-r-[rgb(47_48_55)] z-20 overflow-y-auto'
		>
			<header className='mt-4 flex justify-between px-4 md:hidden'>
				<Logo />
				<button onClick={onClose} className='btn btn-sm text-white'>
					<XIcon />
				</button>
			</header>
			<ul className='flex flex-col pt-2 mb-1 '>
				{NAVIGATION.map(({ href, title, icon: Icon }) => {
					const isAtive = pathname === href
					return (
						<li key={title}>
							<Link href={href} legacyBehavior>
								<a onClick={onClose} className='flex group my-2'>
									<div
										role='group'
										className={cn(
											'group flex w-full items-center py-3 pl-5 gap-4 rounded-md hover:bg-[rgb(27,28,32)] hover:text-white',
											isAtive && 'bg-[rgb(27,28,32)] text-white',
										)}
									>
										<Icon size={22} hasGradient={isAtive} />
										<span>
											{title}
										</span>
									</div>
								</a>
							</Link>
						</li>
					)
				})}
			</ul>
			<div className='separator'></div>
			<SignOutButton />
		</aside>
	)
}