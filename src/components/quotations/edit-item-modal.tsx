import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { useSearch } from '@/hooks/use-search'
import { XIcon } from '@/icons'
import { type QuotationItemType } from '@/types'
import React from 'react'

type Props = {
	open: boolean
	onClose: () => void
	item?: QuotationItemType
	onSubmit: (item: QuotationItemType) => void
}

const initialQuoItem = {
	price: 0,
	qty: 0,
	unit_size: '',
	description: '',
	cost: 0,
}

export function EditItemModal({ open, onClose, item, onSubmit }: Props) {
	const products = useQuotationContext(state => state.products)

	const [quoItem, setQuoItem] = React.useState<typeof initialQuoItem>(
		item || initialQuoItem,
	)

	const { results, searchValue, setSearchValue } = useSearch({
		dataSet: products,
		keys: ['code', 'description'],
	})

	const handleChangeItem = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget

		if (name == 'price' || name == 'qty') {
			setQuoItem({
				...quoItem,
				[name]: Number(value),
			})
		}

		setQuoItem({
			...quoItem,
			[name]: value,
		})
	}

	const handleChangeSearch = (
		event: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		const { name, value } = event.currentTarget
		setQuoItem({
			...quoItem,
			[name]: value,
		})

		if (value.length > 2) {
			setSearchValue(value)
		}
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onSubmit(quoItem)
		onClose()
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className='max-w-sm '>
				<form
					onSubmit={handleSubmit}
				>
					<div className='grid gap-6'>
						<div className='relative'>
							<div className='grid gap-2'>
								<Label htmlFor='description'>Descripcion</Label>
								<Textarea
									autoFocus
									name='description'
									id='description'
									className='h-[90px] resize-none'
									value={quoItem.description}
									onChange={handleChangeSearch}
								/>
							</div>
							<div className='absolute w-full z-40 bg-card max-h-[500px] overflow-y-auto'>
								<ul className='flex flex-col gap-2'>
									{results.map(product => (
										<li
											key={product.id}
											onClick={() => {
												setQuoItem({
													...quoItem,
													description: product.description,
													cost: product.cost,
													price: product.price,
													unit_size: product.unit_size,
													qty: 1,
												})
												setSearchValue('')
											}}
										>
											<div className='grid grid-cols-[60px_1fr] items-center gap-2 hover:bg-zinc-800 hover:text-white rounded-md px-1 py-1'>
												<Badge variant='secondary' className='text-[10px]'>
													{product.code}
												</Badge>
												<p className='text-xs'>
													{product.description.slice(0, 85)}...
												</p>
											</div>
										</li>
									))}
								</ul>
							</div>
							<div className='flex justify-end mt-2'>
								{quoItem.description.length > 3 && (
									<Button
										type='button'
										onClick={() =>
											setQuoItem({
												...quoItem,
												description: '',
											})}
										size='sm'
									>
										<XIcon className='mr-2 size-4' />
										Limpiar
									</Button>
								)}
							</div>
						</div>
						<div className='flex gap-4'>
							<div className='grid gap-2'>
								<label htmlFor='unit_size'>Precio</label>
								<Input
									id='price'
									type='number'
									name='price'
									onChange={handleChangeItem}
									value={quoItem.price}
								/>
							</div>
							<div className='grid gap-2'>
								<label htmlFor='cost'>Cantidad</label>
								<Input
									id='qty'
									name='qty'
									type='number'
									onChange={handleChangeItem}
									value={quoItem.qty}
								/>
							</div>
						</div>
						<div className='flex gap-4'>
							<div className='grid gap-2'>
								<label htmlFor='unit_size'>Unidad / Medida</label>
								<Input
									id='unit_size'
									type='text'
									name='unit_size'
									onChange={handleChangeItem}
									defaultValue={quoItem.unit_size}
								/>
							</div>
							<div className='grid gap-2'>
								<label htmlFor='cost'>Costo</label>
								<Input
									id='cost'
									disabled
									name='cost'
									onChange={handleChangeItem}
									value={quoItem.cost}
								/>
							</div>
						</div>
						<footer className='flex gap-2'>
							<DialogClose asChild>
								<Button type='button' className='w-full'>
									Cancelar
								</Button>
							</DialogClose>
							<Button variant='secondary' className='w-full' type='submit'>
								Aceptar
							</Button>
						</footer>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
