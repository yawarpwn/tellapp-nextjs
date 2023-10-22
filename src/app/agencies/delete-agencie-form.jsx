import { deleteAgencieForm } from './actions'

function DeleteAgencieForm({ id }) {
  return (
    <form action={deleteAgencieForm}>
      <input name='id' value={id} className='sr-only' />
      <button className='btn btn-error' type='submit'>Delete</button>
    </form>
  )
}

export default DeleteAgencieForm
