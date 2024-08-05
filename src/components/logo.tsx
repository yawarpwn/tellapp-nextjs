import { cn } from '@/lib/utils'
import Link from 'next/link'
export function Logo({ size }: { size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }) {
  return (
    <Link href="/new-quos">
      <span
        className={cn(
          `
          inline-flex animate-background-shine bg-[linear-gradient(110deg,rgb(177_75_244),45%,rgb(250_85_95),55%,rgb(177_75_244))] bg-[length:250%_100%] 
          bg-clip-text 
          text-xl font-extrabold text-transparent`,
          size === 'xl' && 'text-4xl',
        )}
      >
        TELLAPP
      </span>
    </Link>
  )
}
