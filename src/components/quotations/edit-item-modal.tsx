import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { type QuotationItemType } from '@/types'
import React from 'react'

type Props = {
	open: boolean
	onClose: () => void
	item?: QuotationItemType
}

export function EditItemModal({ open, onClose, item }: Props) {
	const editItem = useQuotationContext(state => state.editItem)
	const addItem = useQuotationContext(state => state.addItem)
	return open
		? (
			<Dialog open={open} onOpenChange={onClose}>
				<DialogContent className='max-w-sm max-h-[450px] '>
					<form
						onSubmit={(event) => {
							event.preventDefault()
							const formData = new FormData(event.currentTarget)
							const description = formData.get('description') as string
							const price = Number(formData.get('price'))
							const qty = Number(formData.get('qty'))
							const unit_size = String(formData.get('unit_size'))

							if (item) {
								editItem({
									id: item.id,
									cost: item.cost,
									price,
									qty,
									unit_size,
									description,
								})
							} else {
								addItem({
									id: crypto.randomUUID(),
									price,
									qty,
									unit_size,
									description,
									cost: 0,
								})
							}

							onClose()
						}}
					>
						<div className='grid gap-6'>
							<div className='grid gap-2'>
								<Label htmlFor='description'>Descripcion</Label>
								<Textarea
									autoFocus
									name='description'
									id='description'
									className='h-[120px] resize-none'
									defaultValue={item?.description}
								/>
							</div>
							<div className='flex gap-4'>
								<div className='grid gap-2'>
									<label htmlFor='unit_size'>Precio</label>
									<Input
										id='price'
										type='number'
										name='price'
										defaultValue={item?.price}
									/>
								</div>
								<div className='grid gap-2'>
									<label htmlFor='cost'>Cantidad</label>
									<Input
										id='qty'
										name='qty'
										type='number'
										defaultValue={item?.qty}
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
										defaultValue={item?.unit_size}
									/>
								</div>
								<div className='grid gap-2'>
									<label htmlFor='cost'>Costo</label>
									<Input
										id='cost'
										disabled
										name='cost'
										defaultValue={item?.cost}
									/>
								</div>
							</div>
							<footer>
								<Button variant='secondary' className='w-full' type='submit'>
									Aceptar
								</Button>
							</footer>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		)
		: null
}
