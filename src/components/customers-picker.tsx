'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import InputSearch from './input-search'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useQuotationContext } from '@/hooks/use-quotation-store'

export function CustomersPicker() {
	const [open, setOpen] = React.useState(false)

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
					<Button disabled variant={'secondary'}>
						Clientes Frecuentes
					</Button>
				</DialogTrigger>
				{open && (
					<DialogContent>
						<DialogHeader>
							<InputSearch
								searchValue={filterValue}
								placeholder={'Buscar cliente...'}
								onSearchChange={handleSearchChange}
							/>
						</DialogHeader>
						<ul className='overflow-y-auto h-auto flex flex-col'>
							{filteredCustomers.length > 0
								&& filteredCustomers.map(item => {
									return (
										<li
											key={item.id}
											onClick={() => {
												onPickCustomer({
													...item,
													address: item.address || '',
												})
												closeModal()
											}}
											className='flex py-2 px-2 cursor-pointer items-center gap-2 hover:bg-primary hover:text-primary-foreground'
										>
											<p>{item.name}</p>
										</li>
									)
								})}
						</ul>
					</DialogContent>
				)}
			</Dialog>
		</section>
	)
}
