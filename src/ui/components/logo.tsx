import Link from 'next/link'
export function Logo() {
	return (
		<Link href='/quotations'>
			<span className='text-xl font-bold bg-gradient-to-r from-[rgb(250_85_96)] via-[rgb(177_75_244)] to-[rgb(77_145_255)] text-transparent bg-clip-text'>
				TELL
			</span>
			<span className='text-white font-bold'>
				APP
			</span>
		</Link>
	)
}
