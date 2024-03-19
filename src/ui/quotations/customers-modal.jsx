'use client'

import { Input }Search from '@/ui/components/input-search'
import {Modal} from '@/ui/modal'
import './modal-button.css'
import { useMemo, useState } from 'react'
function CustomersModal(
	{ isOpenModal, onCloseModal, onCustomerPick, serverCustomers },
) {
	const [filter, setFilter] = useState('')
	const [selectedCustomer, setSelectedCustomer] = useState(null)

	const handleSubmit = event => {
		event.preventDefault()
		if (selectedCustomer !== null) {
			onCustomerPick({
				company: selectedCustomer.name,
				address: selectedCustomer.address,
				ruc: selectedCustomer.ruc,
			})
			onCloseModal()
		} else {
			return
		}
	}

	const customersToRender = useMemo(() => {
		if (filter) {
			const filteredCustomers = serverCustomers.filter(customer => {
				const filterLower = filter.toLocaleLowerCase()
				const customerNameLower = customer.name.toLowerCase()
				return customerNameLower.includes(filterLower)
			})
			return filteredCustomers
		} else {
			return serverCustomers
		}
	}, [filter, serverCustomers])

	const handleSearchCustomer = event => {
		const { value } = event.target
		setFilter(value)
	}

	const handleCloseModal = () => {
		setFilter('')
		setSelectedCustomer(null)
		onCloseModal()
	}

	const hasCustomers = serverCustomers && serverCustomers.length > 0

	return (
		<Modal isOpen={isOpenModal} onClose={handleCloseModal}>
			<form className='modal-form' onSubmit={handleSubmit}>
				<div className='mt-4'>
					<InputSearch
						placeholder={'Buscar cliente...'}
						onSearchChange={handleSearchCustomer}
					/>
				</div>
				<div className='overflow-y-auto h-[300px] mt-4'>
					{hasCustomers
						&& customersToRender.map(customer => {
							return (
								<label
									className='flex items-center justify-between gap-x-4'
									key={customer.id}
								>
									<div className='flex items-center gap-2'>
										<input
											onChange={() => {
												setSelectedCustomer(customer)
											}}
											type='checkbox'
											className='checkbox'
											checked={selectedCustomer?.id === customer.id}
										/>
										<p className='py-2 text-sm'>{customer.name}</p>
									</div>
								</label>
							)
						})}
				</div>
				<footer className='flex mt-4 items-center justify-between'>
					<button type='submit' className='btn'>
						Aceptar
					</button>
					<button type='button' onClick={handleCloseModal} className='btn'>
						Cancelar
					</button>
				</footer>
			</form>
		</Modal>
	)
}

export default CustomersModal
