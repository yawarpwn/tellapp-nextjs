'use client'

import Input from '@/components/input'
import { CATEGORIES } from '@/constants'
import Link from 'next/link'
import SubmitActionButton from '../submit-action-button'
import { createProduct } from '@/lib/actions/products'
import { useFormState } from 'react-dom'

const initialState = {
  message: null,
  errors: {},
}
function Form() {
  const [state, dispatch] = useFormState(createProduct, initialState)
  console.log(state)
  return (
    <form action={dispatch}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Descripción</span>
        </label>

        <textarea
          required
          name="description"
          placeholder="Descripcion de producto"
          autoFocus
          className="textarea textarea-primary placeholder:text-base-content/30 h-[120px] resize-none"
        />
      </div>

      <Input
        required
        name="code"
        labelText="Codigo"
        type="text"
        placeholder="Descripcion de producto"
      errors={state.errors?.code}
      />
      <div className="flex gap-4">
        <Input
          required
          name="price"
          labelText="Precio"
          type="number"
          step="0.5"
          placeholder="100"
        />

        <Input
          required
          name="cost"
          labelText="Costo"
          type="number"
          placeholder="10.00"
    errors={state.errors?.cost}
        />
      </div>
      <div className="flex items-center gap-2 ">
        <Input
          required
          name="unit_size"
          labelText="Unidad / Medida"
          type="text"
          placeholder="30x30cm"
        />
        <select
          name="category"
          className="select"
          defaultValue=''
          required
        >
          <option value='' disabled>Categoria</option>
          {Object.values(CATEGORIES).map(value => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      <footer className="mt-4 flex justify-between">
        <Link href={'/products'} className="btn">
          Cancelar
        </Link>
        <SubmitActionButton />
      </footer>
    </form>
  )
}

export default Form

