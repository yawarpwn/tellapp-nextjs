'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

// import { getErrorMessage } from "@/lib/handle-error"
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'

import { updateAgencyAction } from '@/lib/actions/agencies'
import { agencyUpdateSchema } from '@/schemas/agencies'
import type { AgencyType, AgencyUpdateType } from '@/types'

interface UpdateTaskSheetProps
	extends React.ComponentPropsWithRef<typeof Sheet>
{
	agency: AgencyType
}

export function UpdateAgencySheet({
	agency,
	onOpenChange,
	...props
}: UpdateTaskSheetProps) {
	const [isUpdatePending, startUpdateTransition] = React.useTransition()

	const form = useForm<AgencyUpdateType>({
		resolver: zodResolver(agencyUpdateSchema),
		defaultValues: {
			company: agency.company,
			ruc: agency.ruc,
			address: agency.address,
			phone: agency.phone,
		},
	})

	function onSubmit(input: AgencyUpdateType) {
		startUpdateTransition(() => {
			toast.promise(
				updateAgencyAction(
					{
						id: agency.id,
						...input,
					},
				),
				{
					loading: 'Actualizando...',
					success: () => {
						onOpenChange?.(false)
						return 'Actualizacion con exito'
					},
					error: (error) => {
						onOpenChange?.(false)
						// return getErrorMessage(error)
						return 'Error al Actualizar'
					},
				},
			)
		})
	}

	return (
		<Sheet onOpenChange={onOpenChange} {...props}>
			<SheetContent className='flex flex-col gap-6 sm:max-w-md'>
				<SheetHeader className='text-left'>
					<SheetTitle>Actualizar</SheetTitle>
					<SheetDescription>
						Completa el formulario para actualizar
					</SheetDescription>
				</SheetHeader>
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

						<SheetFooter className='gap-2 pt-2 sm:space-x-0'>
							<SheetClose asChild>
								<Button type='button' variant='outline'>
									Cancel
								</Button>
							</SheetClose>
							<Button disabled={isUpdatePending}>Actualizar</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	)
}
