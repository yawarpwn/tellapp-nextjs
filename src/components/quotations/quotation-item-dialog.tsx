import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useQuotationContext } from '@/hooks/use-quotation-store'
import React from 'react'
import { QuotationItemForm } from '../quotation-item-form'
export function QuotationDialogItem() {
	const [open, setOpen] = React.useState(false)
	return (
		<>
			<button className='btn btn-secondary' onClick={() => setOpen(true)}>
				open Boton
			</button>
			{open && (
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent>
						<QuotationItemForm />
					</DialogContent>
				</Dialog>
			)}
		</>
	)
}
