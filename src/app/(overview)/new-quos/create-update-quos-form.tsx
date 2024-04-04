'use client'
// import { CreateQuotation as FormSchema } from '@/schemas/quotations'
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
// import { toast } from '@/hooks/use-toast'
import { useQuoStore } from '@/store/quos'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
// import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function CreateUpdateQuosForm() {
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

	const { infoQuo, setInfoQuo } = useQuoStore(state => state)

	const form = useForm<ValidationSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: { ...infoQuo },
	})

	const onSubmit = (values: ValidationSchema) => {
		console.log(values)
		setInfoQuo({
			...infoQuo,
			...values,
		})
	}

	const { formState: { errors } } = form

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid grid-cols-12 gap-4'
			>
				<FormField
					control={form.control}
					name='number'
					render={({ field }) => {
						return (
							<FormItem className='col-span-12'>
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
				<footer className='col-span-12'>
					<Button type='submit'>Submit</Button>
				</footer>
			</form>
		</Form>
	)
}
