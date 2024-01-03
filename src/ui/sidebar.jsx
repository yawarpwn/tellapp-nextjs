'use client'

import { NAVIGATION } from '@/constants'
import { XIcon } from '@/icons'
import SignOutButton from '@/ui/sign-out-button'
import { cn } from '@/utils'
import Link from 'next/link'

export function Sidebar({ onClose = () => {}, isOpen }) {
	return (
		<aside>
			<nav className='fixed top-0 left-0 h-screen supports-[height:dvh]:h-dvh  bg-base-300/50 w-[300px] z-50 backdrop-blur'>
				<div
					className={cn(
						'h-full flex flex-col justify-between p-4',
					)}
				>
					<button
						className='absolute btn btn-circle top-2 right-2'
						onClick={onClose}
					>
						<XIcon />
					</button>
					<ul className='flex flex-col gap-8'>
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
			{isOpen && (
				<div
					onMouseDown={() => {
						onClose()
					}}
					className='fixed inset-0 bg-black/80 z-40'
				>
				</div>
			)}
		</aside>
	)
}
