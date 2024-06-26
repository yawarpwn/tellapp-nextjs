'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, MenuIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Navbar() {
	const router = useRouter()

	return (
		<header className='fixed start-0 end-0 z-30 mx-auto h-[var(--nav-height)] bg-base-100/50 backdrop-blur border-b border-b-base-300 lg:hidden'>
			<div className='flex items-center justify-between w-full h-full'>
				<div className='flex items-center gap-2'>
					<Button
						onClick={() => router.back()}
					>
						<ArrowLeftIcon />
					</Button>
				</div>
				<label
					htmlFor='drawer'
					// onClick={openMenuMobile}
					className='btn btn-sm btn-ghost'
				>
					<MenuIcon />
				</label>
			</div>
		</header>
	)
}

export default Navbar
