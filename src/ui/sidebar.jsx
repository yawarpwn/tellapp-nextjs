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
		const drawerInput = document.querySelector('#drawer')
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
		<aside className='min-h-screen h-full w-60 bg-base-200/80 backdrop-blur '>
			<div
				className={cn(
					'h-full flex flex-col justify-between pb-4 ',
				)}
			>
				<ul className='menu flex flex-col gap-8  mt-[var(--nav-height)]'>
					{NAVIGATION.map(({ href, title, icon: Icon }) => (
						<li key={title}>
							<Link href={href} legacyBehavior>
								<a
									onClick={handleClick}
									className='flex gap-2 group'
								>
									<span className='text-primary'>
										<Icon size={22} />
									</span>
									<span
										className={cn(`group-hover:text-primary-content`, {
											'text-primary-content': pathname === href,
										})}
									>
										{title}
									</span>
								</a>
							</Link>
						</li>
					))}
				</ul>
				<SignOutButton />
			</div>
		</aside>
	)
}
