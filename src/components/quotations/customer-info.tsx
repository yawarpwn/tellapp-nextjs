'use client'

import { CustomersPicker } from '@/components/customers-picker'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { toast } from '@/hooks/use-toast'
import { getRuc } from '@/lib/sunat'
import React from 'react'
import { DatePicker } from '../ui/date-picker'

export function QuotationCustomerInfo() {
	const [loading, setLoading] = React.useState(false)
	const quo = useQuotationContext(state => state.quo)
	const setQuo = useQuotationContext(state => state.setQuo)
	const incrementStep = useQuotationContext(state => state.incrementStep)

	const handleSubmit = () => {
		incrementStep()
	}

	const canContinue = quo.deadline === 0

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
				onSubmit={handleSubmit}
				className='flex flex-col gap-6'
			>
				<DatePicker />
				<div className='grid gap-2'>
					<Label htmlFor='ruc'>Ruc</Label>
					<Input
						id='ruc'
						value={quo.ruc}
						type='text'
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
						type='text'
						value={quo.company}
						disabled={true}
					/>
				</div>

				<div className='grid gap-2'>
					<Label htmlFor='ruc'>Dirección</Label>
					<Input
						id='address'
						name='address'
						type='text'
						value={quo.address}
						disabled={true}
					/>
				</div>

				<div className='grid gap-2'>
					<Label htmlFor='ruc'>Correo</Label>
					<Input
						id='email'
						name='email'
						type='email'
						// value={quo.address}
						// onBlur={handleRucBlur}
						disabled={true}
					/>
				</div>

				<div className='grid gap-2'>
					<Label htmlFor='phone'>Telefono</Label>
					<Input
						id='phone'
						name='phone'
						type='number'
						// value={quo.address}
						disabled={true}
					/>
				</div>

				<div className='grid gap-2'>
					<Label htmlFor='deadline'>
						Tiempo de entrega
					</Label>
					<Input
						required
						type='number'
						id='deadline'
						value={quo.deadline}
						onChange={e => setQuo({ ...quo, deadline: Number(e.target.value) })}
					/>
				</div>
				<div className='flex space-x-3 items-start '>
					<Checkbox
						id='include_igv'
						onCheckedChange={e => setQuo({ ...quo, include_igv: Boolean(e) })}
						checked={quo.include_igv}
					/>
					<Label htmlFor='include_igv'>
						Incluir IGV
					</Label>
				</div>
				<div className='flex space-x-3 items-start '>
					<Checkbox
						id='is_regular_customer'
						checked={quo.is_regular_customer}
						onCheckedChange={e =>
							setQuo({ ...quo, is_regular_customer: Boolean(e) })}
					/>
					<Label htmlFor='is_regular_customer'>
						Agregar como cliente frecuente
					</Label>
				</div>
				<footer className='flex justify-end'>
					<Button disabled={canContinue}>Siguiente</Button>
				</footer>
			</form>
		</>
	)
}
