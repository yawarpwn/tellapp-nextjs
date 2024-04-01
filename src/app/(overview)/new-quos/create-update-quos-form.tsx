'use client'
// import { CreateQuotation as FormSchema } from '@/schemas/quotations'
import { Button } from '@/components/ui/button'
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
import { toast } from '@/hooks/use-toast'
import { createQuo } from '@/lib/actions/quos'
import { CreateQuotation } from '@/schemas/quotations'
import { useQuoStore } from '@/store/quos'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function CreateUpdateQuosForm() {
	const [pending, startTransition] = useTransition()
	const { quo, setQuo } = useQuoStore()

	const form = useForm<z.infer<typeof CreateQuotation>>({
		resolver: zodResolver(CreateQuotation),
		defaultValues: quo,
	})

	const onSubmit = (data: z.infer<typeof CreateQuotation>) => {
		console.log(quo)
		startTransition(async () => {
			const res = await createQuo({ items: [{ 'a': 1 }, { 'a': 2 }] })
			// toast({
			// 	title: 'You submitted the following values:',
			// 	description: (
			// 		<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
			//          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
			// 		</pre>
			// 	),
			// })
		})
	}
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
							<FormItem className='col-span-6'>
								<FormLabel>Numero</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='number'
										placeholder='5020'
										value={quo.number}
										onChange={(e) => setQuo({ ...quo, number: e.target.value })}
									/>
								</FormControl>
								<FormDescription>
									{/* This is public displayName */}
								</FormDescription>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
				<Button disabled={pending} type='submit'>Submit</Button>
			</form>
		</Form>
	)
}
