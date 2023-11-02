import Link from 'next/link'
import { EditIcon, PlusIcon } from '@/icons'

export function AddButton({ href }) {
  return (
    <Link className="btn" href={href}>
      <PlusIcon />
      <span className="">Crear</span>
    </Link>
  )
}

export function EditButton({ href }) {
  return (
    <Link className='btn btn-sm' href={href}>
      <EditIcon />
    </Link>
  )
}
