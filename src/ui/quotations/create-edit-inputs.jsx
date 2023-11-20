'use client'

import Input from '@/ui/components/input'
import Link from 'next/link'
import SubmitActionButton from '../submit-action-button'
import ItemsTable from './items-table'
import { PlusIcon } from '@/icons'
import toast from '@/ui/components/toaster'

import { useCallback, useEffect, useState } from 'react'
import { getRuc } from '@/services/sunat'

function CreateEditInputs({
  state,
  quotation,
  onChange,
  openEditItemModal,
  updateQuotation,
  deleteItem,
  openItemModal,
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleBlur = useCallback(async () => {
    if (quotation.ruc && quotation.ruc.length === 11) {
      setError(null)
      setLoading(true)
      try {
        const { ruc, company, address } = await getRuc(quotation.ruc)
        updateQuotation({ ruc, company, address })
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
  }, [quotation.ruc, updateQuotation])

  useEffect(() => {
    if (error) {
      const notify = () => toast.error(error)
      notify()
    }
  }, [error])

  return (
    <>
      <Input
        labelText="Ruc"
        name="ruc"
        type="number"
        placeholder="20610555536"
        value={quotation?.ruc ?? ''}
        onChange={onChange}
        errors={state.errors?.ruc}
        onBlur={handleBlur}
        disabled={loading}
      />
      <div className="flex gap-2">
        <Input
          labelText="Tiempo de entrega"
          name="deadline"
          type="number"
          placeholder="10"
          value={quotation?.deadline}
          onChange={onChange}
          errors={state.errors?.deadline}
          disabled={loading}
          required
        />
        <Input
          labelText="Número"
          type="number"
          name="number"
          onChange={onChange}
          value={quotation?.number}
          errors={state.errors?.number}
          disabled={loading}
          required
        />
      </div>
      <Input
        labelText="Cliente"
        name="company"
        placeholder="Empresa Recaudadora de Impuesto S.A.C."
        value={quotation?.company}
        onChange={onChange}
        errors={state.errors?.company}
        disabled={loading}
      />

      <Input
        labelText="Dirección"
        name="address"
        placeholder="Av. Sinnombre 323 - LLauca - Lima"
        value={quotation?.address}
        onChange={onChange}
        errors={state.errors?.address}
        disabled={loading}
      />
      <input type="hidden" name="id" value={quotation?.id} />
      <input
        type="hidden"
        name="items"
        value={JSON.stringify(quotation?.items)}
      />
      <div className="mt-4 flex items-center gap-4">
        <input
          name="customer-checkbox"
          className="checkbox checkbox-primary"
          checked
          type="checkbox"
        />
        <label htmlFor="customer-checkbox" className="text-primary">
          Guardar como cliente frecuente
        </label>
      </div>

      <section className="mt-4">
        <header className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Productos: </h3>
          <button
            type="button"
            onClick={openItemModal}
            className="btn btn-primary"
          >
            <PlusIcon />
            Agregar Item
          </button>
        </header>
        <ItemsTable
          items={quotation.items}
          onDelete={deleteItem}
          onEdit={openEditItemModal}
        />
        {state.errors?.items &&
          state.errors.items.map(error => (
            <div className="mt-4 text-sm text-red-500" key={error}>
              {error}
            </div>
          ))}
      </section>
      <footer className="mt-4 flex justify-between">
        <Link href={'/quotations'} className="btn">
          Cancelar
        </Link>
        <SubmitActionButton />
      </footer>
    </>
  )
}

export default CreateEditInputs
