import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { DeleteIcon } from '@/icons'
import { Loader2 } from 'lucide-react'
import React from 'react'
// import { toast } from 'sonner'

interface Props extends React.ComponentPropsWithRef<typeof Dialog> {
	showTrigger?: boolean
	onSuccess: () => void
	action: () => Promise<void>
	dialogDescription?: string | React.ReactNode
	dialogTitle: string | React.ReactNode
}
export function ConfirmActionDialog({
	showTrigger = true,
	onSuccess,
	action,
	dialogTitle = 'Esta abssolutamente seguro?',
	dialogDescription =
		'Esta accion no se puede deshacer, posteriormente no se podra recuperar',
	...props
}: Props) {
	const [pending, startTranstion] = React.useTransition()
	const { toast } = useToast()
	return (
		<Dialog {...props}>
			{showTrigger
				? (
					<DialogTrigger asChild>
						<Button variant='outline' size='sm'>
							<DeleteIcon className='mr-2' />
							Eliminar
						</Button>
					</DialogTrigger>
				)
				: null}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{dialogTitle}</DialogTitle>
					{DialogDescription && (
						<DialogDescription className='py-4'>
							{dialogDescription}
						</DialogDescription>
					)}
					<DialogFooter>
						<DialogClose asChild>
							<Button>Cancelar</Button>
						</DialogClose>
						<Button
							variant={'destructive'}
							disabled={pending}
							onClick={() => {
								startTranstion(async () => {
									try {
										await action()
										toast({
											title: 'Realizado',
											description: 'Se ha realizado la accion',
										})
									} catch (error) {
										toast({
											title: 'Error',
											description: 'No se pudo realizar la accion',
											variant: 'destructive',
										})
									} finally {
										onSuccess()
									}
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
