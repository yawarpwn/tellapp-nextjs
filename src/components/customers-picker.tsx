'use client'

import { type CustomerType } from '@/types'
import React from 'react'
import InputSearch from './input-search'

interface Props {
	onPick: (customer: CustomerType) => void
}

import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useQuotationContext } from '@/hooks/use-quotation-store'

export function CustomersPicker() {
	const [open, setOpen] = React.useState(false)
	const [selectedItemId, setSelectedItemId] = React.useState<string | null>(
		null,
	)

	const [filterValue, setFilterValue] = React.useState('')
	const customers = useQuotationContext(state => state.customers)
	const onPickCustomer = useQuotationContext(state => state.onPickCustomer)

	const filteredCustomers = React.useMemo(() => {
		if (!filterValue) return customers

		return customers.filter(customer => {
			return customer.name.toLowerCase().includes(filterValue.toLowerCase())
		})
	}, [filterValue, customers])

	const closeModal = () => setOpen(false)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const selectedCustomer = customers.find(c => c.id === selectedItemId)
		if (!selectedCustomer) return
		onPickCustomer(selectedCustomer)
		closeModal()
	}

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget
		setFilterValue(value)
	}

	return (
		<section>
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<button className='btn btn-secondary'>
						Clientes Frecuentes
					</button>
				</DialogTrigger>
				<DialogContent>
					<form onSubmit={handleSubmit}>
						<div className='mt-4'>
							<InputSearch
								searchValue={filterValue}
								placeholder={'Buscar cliente...'}
								onSearchChange={handleSearchChange}
							/>
						</div>
						<div className='overflow-y-auto h-[500px] mt-4'>
							{filteredCustomers.length > 0
								&& filteredCustomers.map(item => {
									return (
										<label
											className='flex items-center justify-between gap-x-4'
											key={item.id}
										>
											<div className='flex items-center gap-2'>
												<input
													onChange={() => {
														setSelectedItemId(item.id)
													}}
													type='checkbox'
													className='checkbox checkbox-xs'
													checked={selectedItemId === item.id}
												/>
												<p>{item.name}</p>
											</div>
										</label>
									)
								})}
						</div>
						<footer className='flex w-full gap-4 mt-4'>
							<button className='btn btn-secondary flex-1' type='submit'>
								Aceptar
							</button>
							<button
								onClick={closeModal}
								type='button'
								className='btn btn-secondary flex-1'
							>
								Cancelar
							</button>
						</footer>
					</form>
				</DialogContent>
			</Dialog>
		</section>
	)
}
