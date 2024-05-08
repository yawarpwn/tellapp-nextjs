'use client'

import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const getErrorMessage = () => {}

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

import { createAgencyAction } from '@/lib/actions/agencies'
import { agencyCreateSchema } from '@/schemas/agencies'

import type { AgencyCreateType } from '@/types'

export function CreateAgencyDialog() {
	const [open, setOpen] = React.useState(false)
	const [isCreatePending, startCreateTransition] = React.useTransition()

	function onSubmit(input: AgencyCreateType) {
		startCreateTransition(() => {
			toast.promise(
				createAgencyAction(input),
				{
					loading: 'Creando cliente...',
					success: () => {
						form.reset()
						setOpen(false)
						return 'Cliente Creado'
					},
					error: (error) => {
						setOpen(false)
						console.log(error)
						return 'Error al agregar el Cliente'
						// return getErrorMessage(error)
					},
				},
			)
		})
	}

	const form = useForm<AgencyCreateType>({
		resolver: zodResolver(agencyCreateSchema),
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
							name='company'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Razon Social</FormLabel>
									<FormControl>
										<Input
											placeholder='nombre de cliente'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='ruc'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ruc</FormLabel>
									<FormControl>
										<Input
											placeholder='20610555536'
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
											placeholder='Direccion'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefono</FormLabel>
									<FormControl>
										<Input
											placeholder='Telefono'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='destinations'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Destinos</FormLabel>
									<FormControl>
										<Input
											placeholder='Direccion'
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
