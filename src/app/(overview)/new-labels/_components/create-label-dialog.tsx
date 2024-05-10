'use client'

import { Input } from '@/components/ui/input'
import { getErrorMessage } from '@/lib/handle-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import { createLabelAction } from '@/lib/actions/labels'
import { labelCreateSchema } from '@/schemas/labels'
import type { LabelCreateType } from '@/types'

export function CreateLabelDialog() {
	const [open, setOpen] = React.useState(false)
	const [isCreatePending, startCreateTransition] = React.useTransition()

	function onSubmit(input: LabelCreateType) {
		console.log({ input })
		startCreateTransition(() => {
			toast.promise(
				createLabelAction(input),
				{
					loading: 'Creando cliente...',
					success: () => {
						form.reset()
						setOpen(false)
						return 'Cliente Creado'
					},
					error: (error) => {
						setOpen(false)
						return getErrorMessage(error)
					},
				},
			)
		})
	}

	const form = useForm<LabelCreateType>({
		resolver: zodResolver(labelCreateSchema),
	})

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='primary' size='sm'>
					<PlusIcon className='mr-2 size-4' aria-hidden='true' />
					Crear
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Crear Cliente</DialogTitle>
					<DialogDescription>
						LLena el formulario para crear un nuevo Cliente
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-4'
					>
						<FormField
							control={form.control}
							name='recipient'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Destinatario</FormLabel>
									<FormControl>
										<Input
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='dni_ruc'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Dni/Ruc</FormLabel>
									<FormControl>
										<Input
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='destination'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Destino</FormLabel>
									<FormControl>
										<Input
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='address'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Direccion</FormLabel>
									<FormControl>
										<Input
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter className='gap-2 pt-2 sm:space-x-0'>
							<DialogClose asChild>
								<Button type='button' variant='outline'>
									Cancel
								</Button>
							</DialogClose>
							<Button
								type='submit'
								variant='primary'
								disabled={isCreatePending}
							>
								Crear
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
