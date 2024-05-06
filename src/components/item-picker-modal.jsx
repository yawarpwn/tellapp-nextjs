'use client'

import InputSearch from '@/components/input-search'
import { Modal } from '@/components/modal'
import { useMemo, useState } from 'react'

function ItemPickerModal(
	{ isOpen, onClose, onPick, items, renderLabel, filterProperty },
) {
	const [filter, setFilter] = useState('')
	const [selectedItemId, setSelectedItemId] = useState(null)

	const selectedItem = items.find(item => item.id === selectedItemId)

	const handleSubmit = event => {
		event.preventDefault()

		if (!selectedItemId) return

		onPick(selectedItem)
		setFilter('')
		onClose()
	}

	const ItemsToRender = useMemo(() => {
		if (filter) {
			const filteredItems = items.filter(item => {
				const filterLower = filter.toLocaleLowerCase()
				const itemValue = item[filterProperty].toLowerCase()
				return itemValue.includes(filterLower)
			})
			return filteredItems
		} else {
			return items
		}
	}, [filter, items, filterProperty])

	const handleSearchCustomer = event => {
		const { value } = event.target
		setFilter(value)
	}

	const handleCloseModal = () => {
		setFilter('')
		setSelectedItemId(null)
		onClose()
	}

	const hasItems = items && items.length > 0

	return (
		<Modal size='xl' isOpen={isOpen} onClose={handleCloseModal}>
			<form onSubmit={handleSubmit}>
				<div className='mt-4'>
					<InputSearch
						placeholder={'Buscar cliente...'}
						onSearchChange={handleSearchCustomer}
					/>
				</div>
				<div className='overflow-y-auto h-[500px] mt-4'>
					{hasItems
						&& ItemsToRender.map(item => {
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
										{renderLabel(item)}
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

export default ItemPickerModal
