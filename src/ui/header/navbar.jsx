import { NAVIGATION } from '@/constants'
import { BarsIcon } from '@/icons'
import Link from 'next/link'

import SignOutButton from '../sign-out-button'

function Navbar() {
	return (
		<header className='mb-4'>
			<div className='navbar bg-base justify-between'>
				<Link href={'/'} className='btn btn-ghost gap-2'>
					{/* <TellLogo compact={true} /> */}
					<BarsIcon />
				</Link>
				<SignOutButton />
			</div>
			<nav className='overflow-x-auto sticky '>
				<ul className='menu menu-horizontal flex-nowrap bg-base-200  rounded-box'>
					{NAVIGATION.map(({ href, title, icon: Icon }) => (
						<li key={title}>
							<Link href={href}>
								<Icon />
								<span className='hidden md:block'>{title}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Navbar
