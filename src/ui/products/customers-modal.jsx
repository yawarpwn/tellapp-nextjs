'use client'

import InputSearch from '@/ui/components/input-search'
import FormModal from '@/ui/components/form-modal'
import { useMemo, useState } from 'react'
function CustomersModal({ isOpenModal, onCloseModal, onCustomerPick, serverCustomers }) {
	const [filter, setFilter] = useState('')
	const [selectedCustomer, setSelectedCustomer] = useState(null)

	console.log({ selectedCustomer })

	const handleSubmit = event => {
		event.preventDefault()
		if (selectedCustomer !== null) {
			onCustomerPick(selectedCustomer)
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

	const hasCustomers = serverCustomers && serverCustomers.length > 0

	return (
		<FormModal
			isOpen={isOpenModal}
			disableButton={selectedCustomer === null}
			onClose={onCloseModal}
			onSubmit={handleSubmit}
			title="Selecciona un cliente frecuente"
		>
			<div className="mt-4">
				<InputSearch placeholder={'Buscar cliente'} onSearchChange={handleSearchCustomer} />
			</div>
			<div className="overflow-y-auto h-[300px] mt-4">
				{hasCustomers &&
					customersToRender.map(customer => {
						return (
							<label className="flex items-center justify-between gap-x-4" key={customer.id}>
								<div className="flex items-center gap-2">
									<input
										onChange={() => {
											setSelectedCustomer(customer)
										}}
										type="checkbox"
										className="checkbox"
										checked={selectedCustomer?.id === customer.id}
									/>
									<p className="py-2 text-sm">{customer.name}</p>
								</div>
							</label>
						)
					})}
			</div>
		</FormModal>
	)
}

export default CustomersModal
