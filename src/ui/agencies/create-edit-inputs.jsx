import React from 'react'
import Input from '@/components/input'
import Link from 'next/link'
import SubmitActionButton from '@/ui/submit-action-button'

function CreateEditInputs({ agency, state }) {
  return (
    <>
      <Input
        name="company"
        labelText={'Agencia'}
        type="text"
        placeholder="Agencia Lorito S.R.L."
        required
        defaultValue={agency?.company}
        errors={state.errors?.company}
      />
      <Input
        labelText={'Ruc'}
        placeholder="20610666636"
        name="ruc"
        type="number"
        defaultValue={agency?.ruc}
        required
        errors={state.errors?.ruc}
      />

      <Input
        labelText={'Dirección'}
        name="address"
        placeholder="Dirección"
        type="text"
        defaultValue={agency?.address}
        errors={state.errors?.address}
      />

      <Input
        labelText={'Telefono'}
        name="phone"
        placeholder="99888777"
        type="number"
        defaultValue={agency?.phone}
        errors={state.errors?.phone}
      />
      <input name="id" type="hidden" defaultValue={agency?.id} />

      <footer className="mt-4 flex justify-between">
        <Link href={'/products'} className="btn">
          Cancelar
        </Link>
        <SubmitActionButton />
      </footer>
    </>
  )
}

export default CreateEditInputs