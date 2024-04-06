'use client'

import { QuotationItemsTable } from '@/components/quotation-items-table'
import { QuotationAddItemButton } from '@/components/quotations/buttons'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { QuotationCreateSchema } from '@/schemas/quotations'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
// import { useTransition } from 'react'
import { CustomersPicker } from '@/components/customers-picker'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { toast } from '@/hooks/use-toast'
import { getRuc } from '@/lib/sunat'
import {
	type CustomersType,
	type QuotationCreateType,
	type QuotationType,
} from '@/types'
import { useForm } from 'react-hook-form'

export function CreateUpdatePage() {
	const [loading, setLoading] = React.useState(false)
	const quo = useQuotationContext(state => state.quo)
	const setQuo = useQuotationContext(state => state.setQuo)

	const form = useForm<QuotationCreateType>({
		resolver: zodResolver(QuotationCreateSchema),
		defaultValues: { ...quo },
	})

	const onSubmit = (values: QuotationCreateType) => {
		console.log({ values })
	}

	const { formState: { errors } } = form

	// Manejador para selecionar un cliente frecuente
	const handlePickCustomer = (customer: CustomersType) => {
		setQuo({
			company: customer.name,
			ruc: customer.ruc,
			address: customer.address,
			is_regular_customer: true,
		})
	}

	// Manjedor para buscar cliente por Ruc
	const handleRucBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
		const value = event.target.value
		if (value.length === 11) {
			try {
				setLoading(true)
				const { company, ruc, address } = await getRuc(value)
				setQuo({
					ruc,
					company,
					address,
				})
			} catch (error) {
				toast({
					title: 'Error',
					description: 'Ruc no encontrado',
					variant: 'destructive',
				})
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<section>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid grid-cols-12 gap-4'
				>
					<header className='col-span-12 flex justify-between'>
						<div></div>
						<CustomersPicker
							onPick={handlePickCustomer}
						/>
					</header>
					<FormField
						control={form.control}
						name='ruc'
						render={({ field }) => {
							return (
								<FormItem className='col-span-12'>
									<FormLabel>Ruc</FormLabel>
									<FormControl>
										<Input
											{...field}
											value={field.value || ''}
											onChange={field.onChange}
											type='string'
											placeholder='Ej. 20610555536'
											onBlur={handleRucBlur}
											disabled={loading}
										/>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)
						}}
					/>

					{quo?.company && (
						<p className='text-success col-span-12'>{quo.company}</p>
					)}
					{quo?.address && (
						<p className='text-success col-span-12'>{quo.address}</p>
					)}

					<FormField
						control={form.control}
						name='deadline'
						render={({ field }) => {
							return (
								<FormItem className='col-span-12'>
									<FormLabel>Tiempo de Entrega</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='number'
											placeholder='Ej. 5020'
											disabled={loading}
										/>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)
						}}
					/>

					<FormField
						control={form.control}
						name='include_igv'
						render={({ field }) => (
							<FormItem className='col-span-6 flex flex-row space-x-3 items-center'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										disabled={loading}
									/>
								</FormControl>
								<FormLabel>
									Incluir IGV
								</FormLabel>
								<FormDescription>
								</FormDescription>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='is_regular_customer'
						render={({ field }) => (
							<FormItem className='col-span-6 flex flex-row space-x-3 items-center'>
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
										disabled={loading}
									/>
								</FormControl>
								<FormLabel>
									Cliente Frecuente
								</FormLabel>
								<FormDescription>
								</FormDescription>
							</FormItem>
						)}
					/>
					<div className='col-span-12 mt-4 flex justify-between'>
						<div></div>
						<QuotationAddItemButton />
					</div>
					<div className='col-span-12 mt-4'>
						<QuotationItemsTable />
					</div>
					<footer className='flex justify-between col-span-12 gap-4'>
						<button
							className='btn btn-primary flex-1 w-full'
							type='submit'
							disabled={loading}
						>
							Aceptar
						</button>
						<button
							disabled={loading}
							className='btn btn-secondary flex-1 w-full'
							type='button'
						>
							Cancelar
						</button>
					</footer>
				</form>
			</Form>
		</section>
	)
}
