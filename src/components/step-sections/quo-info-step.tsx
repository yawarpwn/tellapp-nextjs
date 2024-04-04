'use client'
// import { CreateQuotation as FormSchema } from '@/schemas/quotations'
import { CustomersPicker } from '@/components/customers-picker'
import { Button } from '@/components/ui/button'
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
import { StepContainer } from '../step-container'
// import { toast } from '@/hooks/use-toast'
import { useQuoStore } from '@/store/quos'
import { type CustomersType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
// import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Props {
	customers: CustomersType[]
}

export function QuoInfoStep({ customers }: Props) {
	const formSchema = z.object({
		number: z.coerce.number(),
		ruc: z.string().optional(),
		company: z.string().optional(),
		address: z.string().optional(),
		deadline: z.number(),
		include_igv: z.boolean(),
		is_regular_customer: z.boolean(),
	})

	type ValidationSchema = z.infer<typeof formSchema>

	const infoQuo = useQuoStore(state => state.infoQuo)
	const setInfoQuo = useQuoStore(state => state.setInfoQuo)
	const increaseStep = useQuoStore(state => state.increaseStep)

	const form = useForm<ValidationSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: { ...infoQuo },
	})

	const onSubmit = (values: ValidationSchema) => {
		setInfoQuo({
			...infoQuo,
			...values,
		})
		increaseStep(1)
	}

	const { formState: { errors } } = form

	const handlePickCustomer = (customer: CustomersType) => {
		setInfoQuo({
			...infoQuo,
			company: customer.name,
			ruc: customer.ruc,
			address: customer.address,
		})
	}

	console.log({ infoQuo })

	return (
		<StepContainer
			onNextStep={form.handleSubmit(onSubmit)}
		>
			<CustomersPicker customers={customers} onPick={handlePickCustomer} />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid grid-cols-12 gap-4'
				>
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
											type='number'
											placeholder='Ej. 20610555536'
										/>
									</FormControl>
									<FormDescription />
									<FormMessage />
								</FormItem>
							)
						}}
					/>

					{infoQuo.company && <p className='col-span-12'>{infoQuo.company}</p>}
					{infoQuo.address && <p className='col-span-12'>{infoQuo.address}</p>}

					<FormField
						control={form.control}
						name='deadline'
						render={({ field }) => {
							return (
								<FormItem className='col-span-6'>
									<FormLabel>Tiempo de Entrega</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='number'
											placeholder='Ej. 5020'
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
						name='number'
						render={({ field }) => {
							return (
								<FormItem className='col-span-6'>
									<FormLabel>Numero</FormLabel>
									<FormControl>
										<Input
											{...field}
											type='number'
											placeholder='Ej. 5020'
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
				</form>
			</Form>
		</StepContainer>
	)
}
