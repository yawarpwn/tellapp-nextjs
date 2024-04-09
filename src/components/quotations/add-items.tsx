import {
	Card,
	CardContent,
} from '@/components/ui/card'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import { DeleteIcon, EditIcon, PlusIcon, XIcon } from '@/icons'
import React from 'react'
import { QuotationSearchProduct } from './search-product'
export function QuotationAddItems() {
	const descrmentStep = useQuotationContext(state => state.descrementStep)
	const items = useQuotationContext(state => state.items)
	const deleteItem = useQuotationContext(state => state.deleteItem)
	const [seletedProductId, setSelectedProductId] = React.useState<
		string | null
	>(null)
	console.log({ items })
	return (
		<section>
			<header className='flex justify-between items-center mb-4'>
				<h2 className='text-xl font-bold mb-4'>
					Agregar Productos
				</h2>
				<button type='button' className='btn btn-secondary'>
					<PlusIcon size={30} />
				</button>
				<QuotationSearchProduct />
			</header>
			{items.length > 0
				? (
					<div className='flex flex-col gap-2'>
						{items.map(item => (
							<Card key={item.id}>
								<CardContent>
									<div className='flex justify-between gap-4 items-center'>
										<div>
											<input
												checked={item.id === seletedProductId}
												onChange={() => setSelectedProductId(item.id)}
												className='checkbox checkbox-sm'
												type='checkbox'
											/>
										</div>
										<div className='flex-1'>
											<p>{item.description}</p>
											<p>10 x S/20.00</p>
										</div>
										<div>
											<span>S/.2000</span>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				)
				: (
					<Card>
						<CardContent>
							Sin Productos
						</CardContent>
					</Card>
				)}

			<footer className='flex justify-between mt-4'>
				<button
					type='button'
					className='btn btn-secondary'
					onClick={descrmentStep}
				>
					Anterior
				</button>
				<button type='button' className='btn btn-secondary'>
					Crear Cotización
				</button>
			</footer>
			{seletedProductId && (
				<div className='fixed bottom-4 left-1/2 -translate-x-1/2'>
					<button
						onClick={() => setSelectedProductId(null)}
						className='btn btn-xs'
					>
						<XIcon />
					</button>
					<button
						onClick={() => ({})}
						className='btn btn-xs'
					>
						<EditIcon />
					</button>
					<button
						onClick={() => {
							deleteItem(seletedProductId)
							setSelectedProductId(null)
						}}
						className='btn btn-xs'
					>
						<DeleteIcon size={20} />
					</button>
				</div>
			)}
		</section>
	)
}
