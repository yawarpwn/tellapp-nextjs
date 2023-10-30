import Input from './input'
// import Modal from "./modal"
import FormModal from './form-modal'
import { useEffect, useState } from 'react'
import { getRuc, getDni } from '@/services/sunat'

const initialLabel = {
  destination: '',
  ruc: ' ',
  recipient: '',
  phone: '',
  address: '',
}

function CreateUpdateLabelModal({
  isOpenModal,
  editingLabel,
  onEditLabel,
  onCreateLabel,
  onCloseModal,
}) {
  const [label, setLabel] = useState(editingLabel ?? initialLabel)
  const isEditing = Boolean(editingLabel)



  useEffect(() => {
    if(isEditing) {
      setLabel(editingLabel)
    }

  }, [editingLabel])

  const handleSearch = async () => {
    const isRuc = label.ruc.length === 11
    const isDni = label.ruc.length === 8

    if (isDni) {
      console.log('isDni')
      const { company } = await getDni(label.ruc)
      setLabel({
        ...label,
        recipient: company,
      })
    }

    if (isRuc) {
      console.log('isRuc')
      const { company } = await getRuc(label.ruc)
      setLabel({
        ...label,
        recipient: company,
      })
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (isEditing) {
      console.log('update')
      onEditLabel(label)
    } else {
      console.log('create')
      onCreateLabel(label)
    }

    onCloseModal()
  }

  const handleChange = event => {
    const { value, name } = event.target
    setLabel({ ...label, [name]: value })
  }
  return (
    <FormModal
      onSubmit={handleSubmit}
      title={isEditing ? 'Actualizar' : 'Crear'}
      isOpen={isOpenModal}
      onClose={onCloseModal}
    >
      <div className="relative w-full">
        <Input
          name="ruc"
          autoFocus
          onChange={handleChange}
          onBlur={handleSearch}
          value={label?.ruc}
          labelText="Ruc"
          type="search"
        />
      </div>

      <Input
        name="recipient"
        onChange={handleChange}
        value={label?.recipient}
        labelText="Destinatario"
        type="text"
      />
      <Input
        name="destination"
        required
        onChange={handleChange}
        value={label?.destination}
        labelText="Destino"
        type="text"
      />

      <Input
        name="phone"
        onChange={handleChange}
        value={label?.phone}
        labelText="Télefono"
        type="number"
      />

      <Input
        name="address"
        onChange={handleChange}
        value={label?.address}
        labelText="Dirección"
        type="text"
      />
    </FormModal>
  )
}

export default CreateUpdateLabelModal
