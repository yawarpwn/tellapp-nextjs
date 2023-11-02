import Link from 'next/link'
import { PlusIcon } from '@/icons'

export function AddButton({ href }) {
  return (
    <Link className="btn" href={href}>
      <PlusIcon />
      <span className="">Crear</span>
    </Link>
  )
}
