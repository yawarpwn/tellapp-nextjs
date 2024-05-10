'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { deleteLabelAction } from '@/lib/actions/labels'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
	id: string
}
export function DeleteLabelDialog({
	onOpenChange,
	open,
	id,
}: Props) {
	const [pending, startTranstion] = React.useTransition()
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Borrar Producto</DialogTitle>
					<DialogDescription className='py-4'>
						Esta absolutamente seguro de borrar este producto
					</DialogDescription>
					<DialogFooter className='gap-y-2'>
						<DialogClose asChild>
							<Button>Cancelar</Button>
						</DialogClose>
						<Button
							variant='primary'
							disabled={pending}
							onClick={() => {
								startTranstion(async () => {
									toast.promise(() => deleteLabelAction(id), {
										loading: 'Eliminando',
										success: () => {
											onOpenChange?.(false)
											return 'Producto Eliminado'
										},
										error: 'No se pudo eliminar',
									})
								})
							}}
						>
							{pending && <Loader2 className='animate-spin mr-2' />}
							Aceptar
						</Button>
					</DialogFooter>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
