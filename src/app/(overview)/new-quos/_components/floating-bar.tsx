import { ConfirmActionDialog } from '@/components/confirm-action-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import {
	DeleteIcon,
	DocumentDuplicateIcon,
	EditIcon,
	EyeIcon,
	XIcon,
} from '@/icons'
import {
	deleteQuotationAction,
	duplicateQuotationAction,
} from '@/lib/actions/quoatations'
import { QuotationType } from '@/types'
import Link from 'next/link'
import React from 'react'
interface Props {
	id: string
	quotation: QuotationType
	clearSelectedRow: () => void
}
export function FloatingBar({ id, quotation, clearSelectedRow }: Props) {
	const [showDeleteModal, setShowDeleteModal] = React.useState(false)
	const [showDuplicateModal, setShowDuplicateModal] = React.useState(
		false,
	)

	const openDuplicateModal = () => setShowDuplicateModal(true)
	const openDeleteModal = () => setShowDeleteModal(true)
	const closeDeleteModal = () => setShowDeleteModal(false)
	const closeDuplicateModal = () => setShowDuplicateModal(false)

	return (
		<>
			<ConfirmActionDialog
				action={() => deleteQuotationAction(id)}
				dialogTitle={
					<>
						¿Deseas borrar la cotización{' '}
						<span className='font-bold text-accent'>
						</span>
					</>
				}
				onSuccess={closeDeleteModal}
				open={showDeleteModal}
				onOpenChange={setShowDeleteModal}
				showTrigger={false}
			/>

			<ConfirmActionDialog
				action={() => duplicateQuotationAction(id)}
				dialogTitle={
					<>
						¿Deseas Duplicar la cotización{' '}
						<span className='font-bold text-accent'>
						</span>
					</>
				}
				onSuccess={closeDuplicateModal}
				open={showDuplicateModal}
				onOpenChange={setShowDuplicateModal}
				showTrigger={false}
			/>
			<div className='fixed inset-x-0 bottom-10 border border-indigo-500 z-40 w-full p-4 '>
				<div className='w-full'>
					<div className='mx-auto w-fit flex items-center gap-2 rounded-md bg-gradient-to-r from-accent via-primary to-secondary p-2 shadow-2xl [&>button]:shrink-0 [&>a]:shrink-0'>
						<div className='flex h-9 items-center rounded-md border border-dashed pl-2.5 pr-1'>
							<span>#{quotation.number}</span>
							<Separator orientation='vertical' className='ml-2 mr-1' />
							<Button
								onClick={clearSelectedRow}
								className='size-7 hover:border'
								size={'icon'}
							>
								<XIcon className='size-4' />
							</Button>
						</div>

						<Button
							variant={'ghost'}
							className='size-9 hover:border'
							size={'icon'}
							asChild
						>
							<Link
								href={`/new-quos/${quotation.number}`}
							>
								<EyeIcon />
							</Link>
						</Button>
						<Button
							variant='ghost'
							className='size-9 hover:border'
							size={'icon'}
							asChild
						>
							<Link href={`/new-quos/${quotation.number}/update`}>
								<EditIcon />
							</Link>
						</Button>
						<Button
							onClick={openDeleteModal}
							className='size-9 hover:border'
							variant='ghost'
							size={'icon'}
						>
							<DeleteIcon />
						</Button>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										onClick={openDuplicateModal}
										className='size-9 '
										variant={'ghost'}
										size='icon'
									>
										<DocumentDuplicateIcon />
									</Button>
								</TooltipTrigger>
								<TooltipContent className='border bg-accent font-semibold text-foreground'>
									<p>Duplicar Cotización</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<Separator />
					</div>
				</div>
			</div>
		</>
	)
}
