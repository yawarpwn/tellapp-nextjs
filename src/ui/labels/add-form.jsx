'use client'
import { useEffect, useState } from 'react'
import Input from '@/components/input'
import Link from 'next/link'
import SubmitActionButton from '../submit-action-button'
import { useFormState } from 'react-dom'
import { getRuc, getDni } from '@/services/sunat'
import toast from '@/ui/components/toaster'

const initialState = {
  message: null,
  errors: {},
}

const initialLabel = {
  destination: '',
  dni_ruc: ' ',
  recipient: '',
  phone: '',
  address: '',
}

function AddLabelForm({ labelToEdit, action }) {
  const [state, dispatch] = useFormState(action, initialState)
  const [label, setLabel] = useState(labelToEdit ?? initialLabel)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const handleChange = event => {
    const { value, name } = event.target
    setLabel({ ...label, [name]: value })
  }

  const handleSearch = async () => {
    const isRuc = label.dni_ruc.length === 11
    const isDni = label.dni_ruc.length === 8

    if (isDni) {
      console.log('isDni')
      setLoading(true)
      try {
        const { company } = await getDni(label.dni_ruc)
        setLabel({
          ...label,
          recipient: company,
        })
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (isRuc) {
      console.log('isRuc')
      setLoading(true)
      try {

        const { company } = await getRuc(label.dni_ruc)
        setLabel({
          ...label,
          recipient: company,
        })

      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (error) {
      const errorNotify = () => toast.error(error)
      errorNotify()
    }
  }, [error])

  return (
    <form action={dispatch}>
      {/* {state?.message && <div className='text-red-500 text-sm'>{state.message}</div>} */}
      <div className="relative w-full">
        <Input
          name="dni_ruc"
          autoFocus
          onChange={handleChange}
          onBlur={handleSearch}
          value={label?.dni_ruc}
          labelText="Ruc"
          type="number"
          disabled={loading}
          required
        />
      </div>

      <Input
        name="recipient"
        onChange={handleChange}
        value={label?.recipient}
        labelText="Destinatario"
        type="text"
        disabled={loading}
        required
        errors={state.errors?.recipient}
      />
      <Input
        name="destination"
        onChange={handleChange}
        value={label?.destination}
        labelText="Destino"
        type="text"
        disabled={loading}
        required
        errors={state.errors?.destination}
      />

      <Input
        name="phone"
        onChange={handleChange}
        value={label?.phone}
        labelText="Télefono"
        type="number"
        disabled={loading}
        errors={state.errors?.phone}
      />

      <Input
        name="address"
        onChange={handleChange}
        value={label?.address}
        labelText="Dirección"
        type="text"
        disabled={loading}
        errors={state.errors?.address}
      />
      <input type="hidden" name="id" value={label?.id} />

      <footer className="mt-4 flex justify-between">
        <Link href={'/customers'} className="btn">
          Cancelar
        </Link>
        <SubmitActionButton />
      </footer>
    </form>
  )
}

export default AddLabelForm
