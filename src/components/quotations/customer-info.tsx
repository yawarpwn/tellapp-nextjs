'use client'

import { CustomersPicker } from '@/components/customers-picker'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { DatePicker } from '../ui/date-picker'

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target
		setQuo({
			...quo,
			[name]: value,
		})
	}

	return (
		<>
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
				className='flex flex-col gap-6'
			>
				<DatePicker />
				<div className='grid gap-2'>
					<Label htmlFor='ruc'>Ruc</Label>
					<Input
						id='ruc'
						value={quo.ruc}
						name='ruc'
						onBlur={handleRucBlur}
						disabled={loading}
						onChange={handleInputChange}
					/>
				</div>

				<div className='grid gap-2'>
					<Label htmlFor='company'>Cliente</Label>
					<Input
						id='company'
						name='company'
						value={quo.company}
						onBlur={handleRucBlur}
						disabled={true}
					/>
				</div>

				<div className='grid gap-2'>
					<Label htmlFor='ruc'>Dirección</Label>
					<Input
						id='address'
						name='address'
						value={quo.address}
						onBlur={handleRucBlur}
						disabled={true}
					/>
				</div>
			</form>
		</>
	)
}
