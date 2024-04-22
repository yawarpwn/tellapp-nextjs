import { cn } from '@/lib/utils'
import Link from 'next/link'
export function Logo({ size }: {
	size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}) {
	return (
		<Link href='/quotations'>
			<span
				className={cn(
					`
font-extrabold text-xl inline-flex animate-background-shine 
bg-[linear-gradient(110deg,rgb(177_75_244),45%,rgb(250_85_95),55%,rgb(177_75_244))] 
bg-[length:250%_100%] bg-clip-text text-transparent`,
					{
						'text-4xl': size === 'xl',
					},
				)}
			>
				TELLAPP
			</span>
		</Link>
	)
}
