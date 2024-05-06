import React from 'react'
import { QuotationItemModal } from '../quotation-item-modal'

export function QuotationAddItemButton() {
	const [open, setOpen] = React.useState(false)
	return (
		<>
			<button onClick={() => setOpen(true)} className='btn btn-secondary'>
				Agregar Producto
			</button>
			{open && (
				<QuotationItemModal
					onOpenChange={setOpen}
					closeModal={() => setOpen(false)}
					open={open}
				/>
			)}
		</>
	)
}
