'use client'

import { Input } from '@/components/ui/input'
import { TABLES } from '@/constants'
import { SearchIcon } from '@/icons'
import { getErrorMessage } from '@/lib/handle-error'
import { createClient } from '@/lib/supabase/client'
import { AgencyType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

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
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import { createLabelAction } from '@/lib/actions/labels'
import { getDni, getRuc } from '@/lib/sunat'
import { labelCreateSchema } from '@/schemas/labels'
import type { LabelCreateType } from '@/types'

export function CreateLabelDialog() {
	const [open, setOpen] = React.useState(false)
	const [isCreatePending, startCreateTransition] = React.useTransition()
	const [agencies, setAgencies] = React.useState<AgencyType[]>([])

	React.useEffect(() => {
		const supabase = createClient()
		supabase
			.from(TABLES.Agencies)
			.select()
			.then(
				({ data, error }) => {
					if (error) {
						console.log(error)
					} else {
						setAgencies(data)
					}
				},
			)
	}, [])

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

	const searchCompany = async () => {
		const dniRuc = form.getValues('dni_ruc')
		console.log(dniRuc)

		if (dniRuc.length !== 8 && dniRuc.length !== 11) {
			toast.warning('Ingresa un dni o ruc válido')
			return
		}

		if (dniRuc.length === 8) {
			console.log('is Dni')

			toast.promise(getDni(dniRuc), {
				loading: 'Buscando DNI...',
				success: ([error, data]) => {
					if (data) {
						form.setValue('recipient', data.company)
						form.setFocus('destination')
					}
					return 'Ruc encontrado'
				},
				error: () => {
					return 'Error al buscar DNI'
				},
			})
		}

		if (dniRuc.length === 11) {
			console.log('isRuc')

			toast.promise(getRuc(dniRuc), {
				loading: 'Buscando ruc...',
				success: ([error, data]) => {
					if (data) {
						form.setValue('recipient', data.company)
						form.setFocus('destination')
					}
					return 'Ruc encontrado'
				},
				error: () => {
					return 'Error al buscar Ruc'
				},
			})
		}
	}

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
					<DialogTitle>Crear Rotulo</DialogTitle>
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
							name='dni_ruc'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Dni/Ruc</FormLabel>
									<FormControl>
										<div className='relative'>
											<Input
												{...field}
											/>
											<Button
												onClick={searchCompany}
												size='icon'
												type='button'
												variant='secondary'
												className='absolute h-full w-8 right-0 top-0'
											>
												<SearchIcon className='size-4' />
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefono</FormLabel>
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
						<FormField
							control={form.control}
							name='agency_id'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Agencia Sugerida</FormLabel>
									<Select
										onValueChange={field.onChange}
									>
										<FormControl>
											<SelectTrigger className='capitalize'>
												<SelectValue placeholder='Seleciona una categoria' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{Object.values(agencies).map((agency) => (
													<SelectItem
														key={agency.id}
														value={agency.id}
														className='capitalize'
													>
														{agency.company}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
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
