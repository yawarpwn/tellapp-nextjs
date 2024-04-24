'use client'

import { cn } from '@/lib/utils'
import * as PrimitiveDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import React from 'react'

const Dialog = PrimitiveDialog.Root
// const Dialog = React.forwardRef<
// 	React.ElementRef<typeof PrimitiveDialog.Root>,
// 	React.ComponentPropsWithoutRef<typeof PrimitiveDialog.Root>
// >(({ children, open, onOpenChange, ...props }, ref) => (
// 	<PrimitiveDialog.Root
// 		open={open}
// 		onOpenChange={onOpenChange}
// 	>
// 		{children}
// 	</PrimitiveDialog.Root>
// ))
//
// Dialog.displayName = PrimitiveDialog.Root.displayName

const DialogTrigger = PrimitiveDialog.Trigger

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof PrimitiveDialog.Overlay>,
	React.ComponentPropsWithRef<typeof PrimitiveDialog.Overlay>
>(({ children, className, ...props }, ref) => (
	<PrimitiveDialog.Overlay
		className={cn(
			'fixed inset-0 z-50 bg-background/50 backdrop-blur-md saturate-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
			className,
		)}
		ref={ref}
		{...props}
	>
		{children}
	</PrimitiveDialog.Overlay>
))

DialogOverlay.displayName = PrimitiveDialog.Overlay.displayName

const DialogContent = React.forwardRef<
	React.ElementRef<typeof PrimitiveDialog.Content>,
	React.ComponentPropsWithRef<typeof PrimitiveDialog.Content>
>(({ children, className, ...props }, ref) => (
	<PrimitiveDialog.Portal>
		<DialogOverlay>
			<PrimitiveDialog.Content
				ref={ref}
				className={cn(
					`fixed inset-0 z-50 grid gap-4 w-full max-w-lg bg-card rounded md:rounded-lg p-6
overflow-hidden h-[95%]
top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-200 shadow-lg
data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-from-left-1/2 data-[state=closed]:slide-out-from-top-[48%]
`,
					className,
				)}
				{...props}
			>
				{children}
				<PrimitiveDialog.Close id='closeDialog' asChild>
					<button className='absolute top-4 right-4 bg-background flex items-center justify-center  rounded-full opacity-70 hover:opacity-100'>
						<X className='w-4 h-4' />
					</button>
				</PrimitiveDialog.Close>
			</PrimitiveDialog.Content>
		</DialogOverlay>
	</PrimitiveDialog.Portal>
))

DialogContent.displayName = PrimitiveDialog.Content.displayName

const DialogHeader = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex flex-col space-y-1.5 text-center',
			className,
		)}
		{...props}
	/>
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={cn(
			'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
			className,
		)}
		{...props}
	/>
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof PrimitiveDialog.Title>,
	React.ComponentPropsWithoutRef<typeof PrimitiveDialog.Title>
>(({ className, ...props }, ref) => (
	<PrimitiveDialog.Title
		ref={ref}
		className={cn(
			'text-lg font-semibold leading-none tracking-tight',
			className,
		)}
		{...props}
	/>
))
DialogTitle.displayName = PrimitiveDialog.Title.displayName

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof PrimitiveDialog.Description>,
	React.ComponentPropsWithoutRef<typeof PrimitiveDialog.Description>
>(({ className, ...props }, ref) => (
	<PrimitiveDialog.Description
		ref={ref}
		className={cn('text-sm text-base-content/50', className)}
		{...props}
	/>
))
DialogDescription.displayName = PrimitiveDialog.Description.displayName

export {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
}
