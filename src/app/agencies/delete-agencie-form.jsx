'use client'
import { deleteAgencieForm } from './actions'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { DeleteIcon } from '@/icons'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button className="btn btn-error" type="submit">
      {pending ? (
        <span className="loading loading-spinner "></span>
      ) : (
        <DeleteIcon />
      )}
    </button>
  )
}

function DeleteAgencieForm({ id }) {
  return (
    <form action={deleteAgencieForm}>
      <input name="id" defaultValue={id} className="sr-only" />
      <SubmitButton />
    </form>
  )
}

export default DeleteAgencieForm
