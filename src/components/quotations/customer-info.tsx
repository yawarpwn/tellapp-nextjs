'use client'

import { CustomersPicker } from '@/components/customers-picker'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	useQuotationContext,
	useQuotationStore,
} from '@/hooks/use-quotation-store'
// import { toast } from '@/hooks/use-toast'
import { insertQuotation, setQuotation } from '@/lib/actions/quoatations'
import { shootCoffeti } from '@/lib/confetti'
import { getRuc } from '@/lib/sunat'
import { QuotationCreateType, QuotationUpdateType } from '@/types'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { DatePicker } from '../ui/date-picker'
import { QuotationAddItems } from './add-items'

export function QuotationCustomerInfo() {
	const [loading, setLoading] = React.useState(false)
	const quo = useQuotationContext(state => state.quo)
	const setQuo = useQuotationContext(state => state.setQuo)
	const items = useQuotationContext(state => state.items)
	const isUpdate = useQuotationContext(state => state.isUpdate)
	const [pending, startTransition] = React.useTransition()
	const store = useQuotationStore()
	const router = useRouter()

	console.log(quo)

	const handleSubmit = () => {
		startTransition(async () => {
			if (isUpdate) {
				// Update Quotation
				toast.promise(() =>
					setQuotation({
						id: quo.id,
						ruc: quo.ruc,
						company: quo.company,
						address: quo.address,
						deadline: quo.deadline as number,
						include_igv: quo.include_igv as boolean,
						is_regular_customer: quo.is_regular_customer as boolean,
						items,
					}), {
					loading: 'Creando',
					success: ([error, data]) => {
						if (error) throw new Error('Error Update')
						if (!data) return
						store?.persist.clearStorage()
						router.push(`/new-quos/${data.number}`)

						return (
							<p>
								Cotizacion {data.number} Actualizando correctamente
							</p>
						)
					},
					error: 'Error Actualizando cotizacion',
				})
			} else {
				// Insert Quotation
				toast.promise(() =>
					insertQuotation({
						ruc: quo.ruc,
						company: quo.company,
						address: quo.address,
						deadline: quo.deadline as number,
						include_igv: quo.include_igv as boolean,
						is_regular_customer: quo.is_regular_customer as boolean,
					}, items), {
					loading: 'Creando',
					success: ([error, data]) => {
						if (error) throw new Error('Error creando Cotizacion')
						if (!data) return
						store?.persist.clearStorage()
						shootCoffeti()
						router.push(`/new-quos/${data.number}`)

						return (
							<p>
								Cotizacion {data.number} Creado correctamente
							</p>
						)
					},
					error: 'Error creando',
				})
			}
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
				toast(
					'Ruc no encontrado',
				)
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
				<div className='flex justify-end'>
					<CustomersPicker />
				</div>
			</header>
			<article className='flex flex-col gap-4'>
				<div className='grid gap-2'>
					<Label htmlFor='ruc'>Ruc</Label>
					<Input
						id='ruc'
						value={quo.ruc ?? ''}
						type='text'
						name='ruc'
						onBlur={handleRucBlur}
						disabled={loading}
						onChange={handleInputChange}
					/>
				</div>
				{/* <div> */}
				{/* 	<p className='text-green-300 text-sm'>{quo.company}</p> */}
				{/* </div> */}
				{/* <div> */}
				{/* 	<p className='text-xs text-muted-foreground'>{quo.address}</p> */}
				{/* </div> */}

				<div className='grid gap-2'>
					<Label htmlFor='company'>Cliente</Label>
					<Input
						id='company'
						name='company'
						type='text'
						value={quo.company ?? ''}
						disabled={true}
					/>
				</div>

				<div className='grid gap-2'>
					<Label htmlFor='ruc'>Dirección</Label>
					<Input
						id='address'
						name='address'
						type='text'
						value={quo.address ?? ''}
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
						disabled={loading}
						onChange={e => setQuo({ ...quo, deadline: Number(e.target.value) })}
					/>
				</div>
				<div className='flex gap-4'>
					<div className='flex space-x-2 items-start '>
						<Checkbox
							id='include_igv'
							onCheckedChange={e => setQuo({ ...quo, include_igv: Boolean(e) })}
							checked={quo.include_igv}
						/>
						<Label htmlFor='include_igv'>
							Incluir IGV
						</Label>
					</div>
					<div className='flex space-x-2 items-start '>
						<Checkbox
							id='is_regular_customer'
							checked={quo.is_regular_customer}
							onCheckedChange={e =>
								setQuo({ ...quo, is_regular_customer: Boolean(e) })}
						/>
						<Label htmlFor='is_regular_customer'>
							Cliente frecuente
						</Label>
					</div>
				</div>
				<QuotationAddItems />
				<footer className='flex items-center justify-between'>
					<Button disabled={pending} type='button' className='px-14' asChild>
						<Link href='/new-quos'>
							Anterior
						</Link>
					</Button>
					<Button
						onClick={handleSubmit}
						variant='primary'
						className='px-14'
						disabled={pending}
						type='submit'
					>
						{pending && <Loader2 className='mr-2 w-4 h-4 animate-spin' />}
						{isUpdate ? 'Actualizar' : 'Crear'}
					</Button>
				</footer>
			</article>
		</>
	)
}
