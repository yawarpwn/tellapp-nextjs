'use client'

import { NAVIGATION } from '@/constants'
import SignOutButton from '@/ui/sign-out-button'
import { cn } from '@/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
	const pathname = usePathname()

	// Close drawer
	const closeDrawer = () => {
		const drawerInput = document.querySelector('#drawer') as HTMLInputElement
		const isChecked = drawerInput.checked

		if (isChecked) {
			drawerInput.checked = false
		} else {
			drawerInput.checked = true
		}
	}

	const handleClick = () => {
		closeDrawer()
	}
	return (
		<aside className='min-h-screen h-full w-60 bg-base-100 backdrop-blur '>
			<div
				className={cn(
					'',
				)}
			>
				<ul className='flex flex-col pt-2 mb-1 '>
					{NAVIGATION.map(({ href, title, icon: Icon }) => {
						const isAtive = pathname === href
						return (
							<li key={title}>
								<Link href={href} legacyBehavior>
									<a
										onClick={handleClick}
										className='flex group my-2'
									>
										<div
											role='group'
											className={cn(
												'group flex w-full items-center py-3 pl-5 gap-4 rounded-md hover:bg-[rgb(27,28,32)] hover:text-white',
												{
													'bg-[rgb(27,28,32)] text-white': isAtive,
												},
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
			</div>
		</aside>
	)
}
