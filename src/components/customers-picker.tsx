'use client'

import { type CustomersType } from '@/types'
import React from 'react'

interface Props {
	customers: CustomersType[]
	onPick: (customer: CustomersType) => void
}

import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from '@/components/ui/dialog'

export function CustomersPicker({ customers, onPick }: Props) {
	const [open, setOpen] = React.useState(false)

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
					<button className='btn btn-primary w-full' type='submit'>
						Aceptar
					</button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
