'use client'

import React from 'react'
import Input from '@/components/input'
import Link from 'next/link'
import SubmitActionButton from '../submit-action-button'
import { createCustomer } from '@/lib/actions/customers'
import { useFormState } from 'react-dom'

const initialState = {
  message: null,
  errors: {},
}
function Form() {
  const [state, dispatch] = useFormState(createCustomer, initialState)
  console.log({state})
  return (
    <form action={dispatch}>
      <Input
        name="name"
        labelText={'Nombre'}
        placeholder="Nuevo Cliente S.A.C."
        type="text"
        required
      />
      <Input
        name="ruc"
        labelText={'Ruc'}
        placeholder="20610555599"
        type="number"
        required
      />
      <Input
        labelText={'Dirección'}
        name="address"
        type="text"
        placeholder="Av. Fauccett 232 - Callao"
      />

      <Input
        name="phone"
        labelText={'Telefono'}
        type="number"
        placeholder="971 531 019"
      />
      <Input
        name="email"
        labelText={'Email'}
        type="email"
        placeholder="ventas@example.com"
      />
      <footer className="mt-4 flex justify-between">
        <Link href={'/customers'} className="btn">
          Cancelar
        </Link>
        <SubmitActionButton />
      </footer>
    </form>
  )
}

export default Form
