import Input from '@/components/input'
import Link from 'next/link'
import SubmitActionButton from '../submit-action-button'
import ItemsTable from './items-table'

function CreateEditInputs({
  state,
  quotation,
  onChange,
  onDeleteItem,
  onAddItem,
  onEditItem,
}) {
  return (
    <>
      <Input
        labelText="Ruc"
        name="ruc"
        type="number"
        placeholder="20610555536"
        value={quotation?.ruc}
        onChange={onChange}

        // onBlur={handleBlur}
      />
      <Input
        labelText="Tiempo de entrega"
        name="deadline"
        type="number"
        placeholder="10"
        value={quotation?.deadline}
        onChange={onChange}
        required
      />
      <Input
        labelText="Cliente"
        name="company"
        placeholder="Sin Ruc Proporcionado"
        value={quotation?.company}
        onChange={onChange}
        disabled
      />

      <Input
        labelText="Dirección"
        name="address"
        placeholder="Av. Sinnombre 323 - LLauca - Lima"
        value={quotation?.address}
        onChange={onChange}
        disabled
      />

      <input type='hidden' name='items' value={JSON.stringify(quotation?.items)} />

      <h3 className="text-2xl font-bold">Lista de Productos</h3>
      <ItemsTable
        items={quotation.items}
        onDelete={onDeleteItem}
        onEdit={onEditItem}
      />
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
