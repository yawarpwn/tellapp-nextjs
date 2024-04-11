import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

type Props = {
	open: boolean
	onClose: () => void
	onEdit: (value: string) => void
	value: string
}
export function EditItemModal({ open, onClose, onEdit, value }: Props) {
	return open
		? (
			<Dialog open={open} onOpenChange={onClose}>
				<DialogContent className='max-w-xs h-40'>
					<form
						onSubmit={(event) => {
							event.preventDefault()
							const formData = new FormData(event.currentTarget)
							const value = formData.get('value') as string
							onEdit(value)
							onClose()
						}}
					>
						<textarea
							style={{ all: 'unset' }}
							className=''
							defaultValue={value}
						/>
					</form>
				</DialogContent>
			</Dialog>
		)
		: null
}
