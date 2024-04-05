'use client'

import { useSearch } from '@/hooks/use-search'
import { createBrowserClient } from '@/lib/supabase'
import { ProductType } from '@/types'
import { QuotationItemType } from '@/types'
import { XIcon } from 'lucide-react'
import React from 'react'
import { Input } from './input'
import { Textarea } from './textarea'

interface Props {
	itemToEdit?: QuotationItemType
	onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
	open: boolean
	closeModal: () => void
}

import {
	Dialog,
	DialogContent,
} from '@/components/ui/dialog'
import { useQuoStore } from '@/store/quos'

const initialState = {
	price: 0,
	qty: 0,
	description: '',
	cost: 0,
	unit_size: '',
}

export function QuotationItemModal(props: Props) {
	const { itemToEdit, open, onOpenChange, closeModal } = props
	// const [open, setOpen] = React.useState(false)
	const [item, setItem] = React.useState(props.itemToEdit || initialState)
	const [products, setProducts] = React.useState<ProductType[]>([])
	const addItem = useQuoStore(state => state.addItem)
	const editItem = useQuoStore(state => state.editItem)

	const { results, setSearchValue } = useSearch({
		dataSet: products,
		keys: ['description', 'code'],
	})

	const isCreate = !props.itemToEdit
	// const closeModal = () => setOpen(false)

	React.useEffect(() => {
		const supabase = createBrowserClient()
		const getProducts = async () => {
			const { data, error } = await supabase
				.from('products')
				.select()
				.returns<ProductType[]>()

			if (data) {
				setProducts(data)
			}
		}

		getProducts()
	}, [])

	const showClearDescription = item.description.length >= 3

	const handleChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value: string | number = event.target.value
		const { name } = event.target

		if (name === 'qty' || name === 'price') {
			value = Number(value)
		}

		setItem(prev => ({ ...prev, [name]: value }))
	}

	const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setItem(prev => ({ ...prev, description: event.target.value }))
		setSearchValue(event.target.value)
	}

	const handleProductClick = (product: ProductType) => {
		if (!item.qty || !item.price) {
			setItem({
				...item,
				description: product.description,
				unit_size: product.unit_size,
				price: product.price,
				cost: product.cost,
				qty: 1,
			})
		} else {
			setItem({
				...item,
				unit_size: product.unit_size,
				description: product.description,
				cost: product.cost,
			})
		}
	}

	const clearDescription = () => {
		setItem(prev => ({
			...prev,
			description: '',
		}))
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (isCreate) {
			addItem({
				id: crypto.randomUUID(),
				price: item.price,
				qty: item.qty,
				unit_size: item.unit_size,
				description: item.description,
				cost: item.cost,
			})
		} else {
			editItem({
				id: itemToEdit.id,
				price: item.price,
				qty: item.qty,
				unit_size: item.unit_size,
				description: item.description,
				cost: item.cost,
			})
		}
		closeModal()
	}

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<div className='flex flex-col gap-4 '>
						<div className='relative'>
							{showClearDescription && (
								<button
									type='button'
									onClick={clearDescription}
									className='btn btn-circle btn-xs absolute right-2 top-12 z-10'
								>
									<XIcon />
								</button>
							)}
							<Textarea
								labelText='Descripcion'
								autoFocus
								className='h-[120px]  w-full'
								placeholder='Buscar producto'
								onChange={handleSearch}
								value={item.description}
								name='description'
								required
							/>
						</div>

						<ul className='menu bg-none w-full bg-base-200 flex-nowrap gap-4  rounded-box h-[300px] overflow-y-auto'>
							{results?.length > 0
								? results.map(item => (
									<li
										onClick={() => handleProductClick(item)}
										className='flex gap-x-1 '
										key={item.id}
									>
										<div className='p-0 flex items-center gap-x-2'>
											<span className='btn btn-primary btn-xs h-full '>
												<p style={{ writingMode: 'vertical-lr' }}>
													{item.code}
												</p>
											</span>
											<span className='p-0'>{item.description}</span>
										</div>
									</li>
								))
								: Array.from({ length: 6 })
									.fill(0)
									.map((_, index) => (
										<li key={index}>
											<span className='skeleton h-[30px]'>
											</span>
										</li>
									))}
						</ul>
						<div className='flex gap-2 w-full'>
							<div className='w-full'>
								<Input
									onChange={handleChangeItem}
									value={item.qty}
									type='number'
									labelText='Cantidad'
									name='qty'
									required
								/>
							</div>
							<div className='w-full'>
								<Input
									onChange={handleChangeItem}
									value={item.unit_size}
									type='text'
									labelText='U/M'
									name='unit_size'
									required
								/>
							</div>
						</div>
						<div className='flex gap-2 w-full'>
							<div className='w-full'>
								<Input
									onChange={handleChangeItem}
									value={item.price}
									type='number'
									labelText='Precio'
									name='price'
									required
								/>
							</div>
							<div className='w-full'>
								<Input
									value={item.cost}
									type='number'
									labelText='Costo'
									name='cost'
									disabled
								/>
							</div>
						</div>
					</div>
					<footer className='flex items-center gap-4 mt-4 '>
						<button className='btn btn-secondary flex-1' type='submit'>
							{isCreate ? 'Crear' : 'Actualizar'}
						</button>
						<button
							className='btn btn-secondary flex-1'
							onClick={closeModal}
						>
							Cancelar
						</button>
					</footer>
				</form>
			</DialogContent>
		</Dialog>
	)
}
