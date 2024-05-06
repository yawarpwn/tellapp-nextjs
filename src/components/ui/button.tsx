import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors 
focus-visible:outline-none focus-visible:ring-none focus-visible:ring-ring 
disabled:pointer-events-none disabled:opacity-40 `,
	{
		variants: {
			variant: {
				default:
					`bg-[rgba(255,255,255,0.08)] bg-origin-padding  hover:bg-[rgba(252,255,255,0.16)]`,
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary:
					`border border-transparent [background:var(--border-gradient)] hover:[background:var(--border-gradient-hover)]`,
				ghost:
					'hover:bg-white/40 bg-white/20 hover:text-accent-white hover:border-white/20',
				link: 'text-primary underline-offset-4 hover:underline',
				primary:
					`bg-gradient-to-r from-accent from-0% via-primary via-50% to-secondary to-100% text-secondary-foreground 
hover:shadow-[rgba(161,128,255,0.6)_0px_0px_1rem_0px] hover:text-white
          disabled:bg-gradient-to-r disabled:from-[#4e4343] disabled:via-[#757575] disabled:to-[#9a9a9a]
`,
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'w-9 h-9 w-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
)

export interface ButtonProps
	extends
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants>
{
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, className }),
					'',
				)}
				ref={ref}
				{...props}
			/>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
