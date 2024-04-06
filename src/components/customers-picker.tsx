'use client'

import { type CustomersType } from '@/types'
import React from 'react'

interface Props {
	onPick: (customer: CustomersType) => void
}

import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useQuotationContext } from '@/hooks/use-quotation-store'

export function CustomersPicker({ onPick }: Props) {
	const [open, setOpen] = React.useState(false)
	const customers = useQuotationContext(state => state.customers)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onPick(customers[2])
		setOpen(false)
	}

	return (
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
					{customers.map((customer) => (
						<div key={customer.id}>
							{customer.name}
						</div>
					))}
					<footer className='flex w-full gap-4 mt-4'>
						<button className='btn btn-secondary flex-1' type='submit'>
							Aceptar
						</button>
						<button
							onClick={() => setOpen(false)}
							type='button'
							className='btn btn-secondary flex-1'
						>
							Cancelar
						</button>
					</footer>
				</form>
			</DialogContent>
		</Dialog>
	)
}
