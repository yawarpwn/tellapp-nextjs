import { useQuotationContext } from '@/hooks/use-quotation-store'
import {
	DeleteIcon,
	DocumentDuplicateIcon,
	EditIcon,
	PlusIcon,
	XIcon,
} from '@/icons'

import { QuotationItemType } from '@/types'
import {
	animations,
} from '@formkit/drag-and-drop'
import {
	useDragAndDrop,
} from '@formkit/drag-and-drop/react'
import { GripHorizontal } from 'lucide-react'
import React from 'react'
import { EditItemModal } from './edit-item-modal'
import { QuotationSearchProduct } from './search-product'
export function QuotationAddItems() {
	const descrmentStep = useQuotationContext(state => state.decrementStep)
	// const setItems = useQuotationContext(state => state.setItems)
	const items = useQuotationContext(state => state.items)
	const setItems = useQuotationContext(state => state.setItems)
	const duplicateItem = useQuotationContext(state => state.duplicateItem)

	const [parentDrag, itemsDrag, setItemsDrag] = useDragAndDrop<
		HTMLUListElement,
		QuotationItemType
	>(items, {
		dragHandle: '.drag-handle',
		plugins: [animations()],
	})

	const editItem = useQuotationContext(state => state.editItem)
	const deleteItem = useQuotationContext(state => state.deleteItem)
	const [seletedProductId, setSelectedProductId] = React.useState<
		string | null
	>(null)

	const [open, setOpen] = React.useState(false)
	const closeItemModal = () => setOpen(false)

	const onChangeValue = (
		e: React.ChangeEvent<HTMLInputElement>,
		item: QuotationItemType,
	) => {
		const { name, value } = e.target
		if (name == 'price' || name == 'qty') {
			editItem({
				...item,
				[name]: Number(value),
			})
		} else {
			editItem({
				...item,
				[name]: value,
			})
		}
	}

	React.useEffect(() => {
		setItemsDrag(items)
	}, [setItemsDrag, items])

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
			{itemsDrag.length > 0
				? (
					<ul ref={parentDrag} className='flex flex-col gap-2'>
						{itemsDrag.map(item => (
							<li className='card bg-black border' key={item.id}>
								<div className='p-4 border-base-200'>
									<div className='flex justify-between'>
										<input
											checked={item.id === seletedProductId}
											onChange={() =>
												setSelectedProductId(item.id)}
											className='checkbox checkbox-sm'
											type='checkbox'
										/>
										<button
											onClick={() =>
												duplicateItem(item)}
										>
											<DocumentDuplicateIcon />
										</button>
										<span className='drag-handle'>
											<GripHorizontal />
										</span>
									</div>

									<div className='flex justify-between gap-4 items-center'>
										<div className='flex flex-col gap-4'>
											<div className='flex-1'>
												<p className='text-xs'>{item.description}</p>
											</div>
											<div className='flex gap-2 overflow-hidden'>
												<input
													className='w-32 bg-transparent  px-2 py-1 rounded border border-transparent outline-none focus:border-primary text-xs'
													type='text'
													onChange={(e) => onChangeValue(e, item)}
													name='unit_size'
													value={item.unit_size}
												/>
												<input
													className='w-16 bg-transparent px-2 py-1 rounded border border-transparent outline-none focus:border-primary'
													type='number'
													onChange={(e) => onChangeValue(e, item)}
													name='price'
													value={item.price}
												/>
												<input
													className='w-16 bg-transparent px-2 py-1 rounded border border-transparent outline-none focus:border-primary'
													type='number'
													onChange={(e) => onChangeValue(e, item)}
													name='qty'
													value={item.qty}
												/>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				)
				: (
					<div>
						<div>
							Sin Productos
						</div>
					</div>
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

// <EditItemModal
// 	value={String(item.price)}
// 	onEdit={(editedValue: string) => {
// 		editItem({
// 			...item,
// 			price: Number(editedValue),
// 		})
// 	}}
// 	open={open}
// 	onClose={closeItemModal}
// />
