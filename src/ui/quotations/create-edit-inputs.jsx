'use client'

import Input from '@/components/input'
import Link from 'next/link'
import SubmitActionButton from '../submit-action-button'
import ItemsTable from './items-table'
import { PlusIcon } from '@/icons'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useCallback, useState } from 'react'
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
  const [lastQuotationNumber, setLastQuotationNumber] = useState(null)
  const [loading, setLoading] = useState(false)
  const getLasQuotationNumber = useCallback(async () => {
    const supabase = createClientComponentClient()
    const { data } = await supabase
      .from('quotations')
      .select('number')
      .order('number', { ascending: false })
      .limit(1)
    setLastQuotationNumber(data[0]?.number)
  }, [])

  useEffect(() => {
    getLasQuotationNumber()
  }, [getLasQuotationNumber])

  const handleBlur = useCallback(async () => {
    if (quotation.ruc && quotation.ruc.length === 11) {
      setLoading(true)
      const { ruc, company, address } = await getRuc(quotation.ruc)
      updateQuotation({ ruc, company, address })
      setLoading(false)
    }
  }, [quotation.ruc, updateQuotation])

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
      <input type='hidden' name='id' value={quotation?.id} />
      <input type='hidden' name='items' value={JSON.stringify(quotation?.items)} />

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
