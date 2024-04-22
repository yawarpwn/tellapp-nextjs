import { buttonVariants } from '@/components/ui/button'
import { EditIcon, PlusIcon } from '@/icons'
import Link from 'next/link'

export function AddButton({ href }) {
	return (
		<Link className={buttonVariants({ variant: 'primary' })} href={href}>
			<PlusIcon className='ml-1' />
			<span className=''>Crear</span>
		</Link>
	)
}

export function EditButton({ href }) {
	return (
		<Link href={href} className='btn btn-sm'>
			<EditIcon size={20} />
		</Link>
	)
}
