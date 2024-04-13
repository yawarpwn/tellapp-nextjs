'use client'

import { CustomersPicker } from '@/components/customers-picker'
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
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { toast } from '@/hooks/use-toast'
import { getRuc } from '@/lib/sunat'
import { QuotationCreateSchema } from '@/schemas/quotations'
import {
	type QuotationCreateType,
} from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

export function QuotationCustomerInfo() {
	const [loading, setLoading] = React.useState(false)
	const quo = useQuotationContext(state => state.quo)
	const setQuo = useQuotationContext(state => state.setQuo)
	const incrementStep = useQuotationContext(state => state.incrementStep)

	const form = useForm<QuotationCreateType>({
		resolver: zodResolver(QuotationCreateSchema),
		mode: 'onSubmit',
		defaultValues: quo,
	})

	const onSubmit = () => {
		console.log('submit main')
		incrementStep()
	}

	const { formState: { errors } } = form

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
		<>
			<Form {...form}>
				<header className='flex justify-between'>
					<div>
					</div>
					<div className='flex gap-4'>
						<div>
						</div>
						<CustomersPicker />
					</div>
				</header>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid grid-cols-12 gap-4'
				>
					<FormField
						control={form.control}
						name='deadline'
						render={({ field }) => {
							return (
								<FormItem className='col-span-12'>
									<FormLabel>Tiempo de Entrega</FormLabel>
									<FormControl>
										<Input
											type='number'
											value={quo.deadline}
											onChange={e =>
												setQuo({
													...quo,
													deadline: Number(e.target.value),
												})}
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
						name='ruc'
						render={({ field }) => {
							return (
								<FormItem className='col-span-12'>
									<FormLabel>Ruc</FormLabel>
									<FormControl>
										<Input
											value={quo.ruc}
											onBlur={handleRucBlur}
											disabled={loading}
											onChange={(event) =>
												setQuo({
													...quo,
													ruc: event.target.value,
												})}
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
						name='company'
						render={({ field }) => {
							return (
								<FormItem className='col-span-12'>
									<FormLabel>Cliente</FormLabel>
									<FormControl>
										<Input
											value={quo.company}
											onChange={(e) => {
												setQuo({
													...quo,
													company: e.target.value,
												})
											}}
											disabled
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
						name='address'
						render={({ field }) => {
							return (
								<FormItem className='col-span-12'>
									<FormLabel>Dirección</FormLabel>
									<FormControl>
										<Input
											value={quo.address}
											onChange={(e) => {
												setQuo({
													...quo,
													address: e.target.value,
												})
											}}
											disabled
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
										checked={quo.include_igv}
										onCheckedChange={() => {
											setQuo({
												...quo,
												include_igv: !quo.include_igv,
											})
										}}
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
										checked={quo.is_regular_customer}
										onCheckedChange={() =>
											setQuo({
												...quo,
												is_regular_customer: !quo.is_regular_customer,
											})}
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
					<footer className='flex justify-between col-span-12 gap-4 mt-4'>
						<button
							className='btn btn-secondary w-full'
							type='submit'
							disabled={loading}
						>
							Siguiente
						</button>
					</footer>
				</form>
			</Form>
		</>
	)
}
