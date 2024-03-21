import { TrashIcon } from '@/icons'
import { deleteProduct } from '@/lib/actions/products'
import { ActionForm } from '@/ui/components/action-button'

export function ProductDeleteButton({ id }: { id: string }) {
	return (
		<ActionForm
			action={deleteProduct}
			buttonComponent={
				<button className='btn btn-sm'>
					<TrashIcon size={20} />
				</button>
			}
		>
			<input
				name='id'
				value={id}
				type='hidden'
				className='sr-only'
			/>
		</ActionForm>
	)
}
