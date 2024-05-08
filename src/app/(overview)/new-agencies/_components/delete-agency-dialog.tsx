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
import { deleteAgencyAction } from '@/lib/actions/agencies'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface Props extends React.ComponentPropsWithoutRef<typeof Dialog> {
	id: string
}
export function DeleteAgencyDialog({
	onOpenChange,
	open,
	id,
}: Props) {
	const [pending, startTranstion] = React.useTransition()
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Borrar Agencia</DialogTitle>
					<DialogDescription className='py-4'>
						Esta absolutamente seguro?
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
									toast.promise(() => deleteAgencyAction(id), {
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
