'use client'

import { PlusIcon } from '@/icons'
import { Input } from '@/ui/components/input'
import { SubmitButton } from '@/ui/components/submit-button'
import toast from '@/ui/components/toaster'
import Link from 'next/link'
import ItemsTable from './items-table'

import { getRuc } from '@/services/sunat'
import { useCallback, useEffect, useState } from 'react'

function CreateEditInputs({
	state,
	quotation,
	onChange,
	openEditItemModal,
	updateQuotation,
	deleteItem,
	openItemModal,
}) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const handleBlur = useCallback(async () => {
		if (quotation.ruc && quotation.ruc.length === 11) {
			setError(null)
			setLoading(true)
			try {
				const { ruc, company, address } = await getRuc(quotation.ruc)
				updateQuotation({ ruc, company, address })
			} catch (error) {
				setError(error.message)
			} finally {
				setLoading(false)
			}
		}
	}, [quotation.ruc, updateQuotation])

	useEffect(() => {
		if (error) {
			const notify = () => toast.error(error)
			notify()
		}
	}, [error])

	return (
		<>
			<div className='grid grid-cols-12 gap-4'>
				<div className='col-span-12'>
					<Input
						labelText='Ruc'
						name='ruc'
						type='number'
						placeholder='20610555536'
						value={quotation?.ruc ?? ''}
						onChange={onChange}
						errors={state.errors?.ruc}
						onBlur={handleBlur}
						disabled={loading}
					/>
				</div>
				<div className='col-span-6'>
					<Input
						labelText='Tiempo de entrega'
						name='deadline'
						type='number'
						placeholder='10'
						value={quotation?.deadline}
						onChange={onChange}
						errors={state.errors?.deadline}
						disabled={loading}
						required
					/>
				</div>
				<div className='col-span-6'>
					<Input
						labelText='Número'
						type='number'
						name='number'
						onChange={onChange}
						value={quotation?.number}
						errors={state.errors?.number}
						disabled={loading}
						required
					/>
				</div>
				<div className='col-span-12'>
					<Input
						labelText='Cliente'
						name='company'
						placeholder='Empresa Recaudadora de Impuesto S.A.C.'
						value={quotation?.company}
						onChange={onChange}
						errors={state.errors?.company}
						disabled={loading}
					/>
				</div>

				<div className='col-span-12'>
					<Input
						labelText='Dirección'
						name='address'
						placeholder='Av. Sinnombre 323 - LLauca - Lima'
						value={quotation?.address}
						onChange={onChange}
						errors={state.errors?.address}
						disabled={loading}
					/>
				</div>
				<input type='hidden' name='id' value={quotation?.id} />
				<input
					type='hidden'
					name='items'
					value={JSON.stringify(quotation?.items)}
				/>
				<div className='col-span-6 flex items-center gap-4'>
					<input
						id='is_regular_customer'
						name='is_regular_customer'
						className='checkbox checkbox-primary'
						type='checkbox'
						onChange={onChange}
						checked={quotation.is_regular_customer}
						// defaultChecked={quotation.is_regular_customer}
					/>
					<label htmlFor='is_regular_customer' className='text-sm'>
						Cliente frecuente
					</label>
				</div>

				<div className='col-span-6 flex items-center gap-4'>
					<input
						name='include_igv'
						id='include_igv'
						checked={quotation.include_igv}
						onChange={onChange}
						// defaultChecked={quotation.include_igv ?? true}
						// defaultValue={quotation.include_igv ?? true}
						className='checkbox checkbox-primary'
						type='checkbox'
					/>
					<label htmlFor='include_igv' className='text-sm'>
						Icluir IGV
					</label>
				</div>

				<section className='col-span-12 mt-4'>
					<header className='flex items-center justify-between'>
						<h3 className='text-xl font-bold'>Productos:</h3>
						<button
							type='button'
							onClick={openItemModal}
							className='btn btn-primary'
						>
							<PlusIcon />
							Agregar Item
						</button>
					</header>
					<ItemsTable
						items={quotation.items}
						onDelete={deleteItem}
						onEdit={openEditItemModal}
					/>
					{state.errors?.items
						&& state.errors.items.map(error => (
							<div className='mt-4 text-sm text-red-500' key={error}>
								{error}
							</div>
						))}
				</section>
			</div>
			<footer className='mt-4 flex justify-between'>
				<Link href={'/quotations'} className='btn'>
					Cancelar
				</Link>
				<SubmitButton />
			</footer>
		</>
	)
}

export default CreateEditInputs
