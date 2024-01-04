import { EditIcon, PlusIcon } from '@/icons'
import Link from 'next/link'

export function AddButton({ href }) {
	return (
		<Link className='btn btn-sm btn-primary' href={href}>
			<PlusIcon />
			<span className=''>Crear</span>
		</Link>
	)
}

export function EditButton({ href }) {
	return (
		<Link href={href}>
			<EditIcon />
		</Link>
	)
}
