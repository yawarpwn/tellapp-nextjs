'use client'
import { createAgency } from '@/lib/actions/agencies'
import { useFormState } from 'react-dom'
import CreateEditInputs from './create-edit-inputs'

const initialState = {
  message: null,
  errors: {},
}
function AddForm() {
  const [state, dispatch] = useFormState(createAgency, initialState)
  console.log({state})
  return (
    <form action={dispatch}>
      <CreateEditInputs state={state} />
    </form>
  )
}

export default AddForm

