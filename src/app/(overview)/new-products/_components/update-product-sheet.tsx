'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

import { updateProductAction } from '@/lib/actions/products'

import { ProductUpdateSchema } from '@/schemas/products'
import type { ProductType } from '@/types'
import type { ProductUpdateType } from '@/types'

import { PRODUCT_CATEGORIES } from '@/constants'

interface UpdateTaskSheetProps
	extends React.ComponentPropsWithRef<typeof Sheet>
{
	product: ProductType
}

export function UpdateProductSheet({
	product,
	onOpenChange,
	...props
}: UpdateTaskSheetProps) {
	const [isUpdatePending, startUpdateTransition] = React.useTransition()

	const form = useForm<ProductUpdateType>({
		resolver: zodResolver(ProductUpdateSchema),
		defaultValues: {
			description: product.description,
			code: product.code,
			price: product.price,
			unit_size: product.unit_size,
			cost: product.cost,
		},
	})

	function onSubmit(input: z.infer<typeof ProductUpdateSchema>) {
		startUpdateTransition(() => {
			toast.promise(
				updateProductAction({
					id: product.id,
					...input,
				}),
				{
					loading: 'Updating task...',
					success: () => {
						onOpenChange?.(false)
						return 'Task updated'
					},
					error: (error) => {
						onOpenChange?.(false)
						// return getErrorMessage(error)
						return 'Error al agregar el proyecto'
					},
				},
			)
		})
	}

	return (
		<Sheet onOpenChange={onOpenChange} {...props}>
			<SheetContent className='flex flex-col gap-6 sm:max-w-md'>
				<SheetHeader className='text-left'>
					<SheetTitle>Actualizar Producto</SheetTitle>
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
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Textarea
											className='resize-none h-[150px]'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='code'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Codigo</FormLabel>
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
							name='unit_size'
							render={({ field }) => (
								<FormItem>
									<FormLabel>U/M</FormLabel>
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
							name='price'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Precio</FormLabel>
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
							name='cost'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Costo</FormLabel>
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
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Categoria</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={product.category}
									>
										<FormControl>
											<SelectTrigger className='capitalize'>
												<SelectValue placeholder='Seleciona una categoria' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup>
												{Object.values(PRODUCT_CATEGORIES).map((product) => (
													<SelectItem
														key={product}
														value={product}
														className='capitalize'
													>
														{product}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
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
