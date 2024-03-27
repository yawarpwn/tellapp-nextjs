import Link from 'next/link'
export function Logo() {
	return (
		<Link href='/quotations'>
			<span
				className={`
font-extrabold text-xl inline-flex animate-background-shine 
bg-[linear-gradient(110deg,rgb(177_75_244),45%,rgb(250_85_95),55%,rgb(177_75_244))] 
bg-[length:250%_100%] bg-clip-text text-transparent`}
			>
				TELLAPP
			</span>
		</Link>
	)
}
