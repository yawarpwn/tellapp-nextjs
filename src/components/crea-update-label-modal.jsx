import Input from "./input"
import Modal from "./modal"
import { useState } from "react"
import { getRuc, getDni } from '@/services/sunat'

const initialLabel = {
  destination: '',
  ruc: ' ',
  recipient: '',
  phone: '',
  address: ''
}

function CreateUpdateLabelModal({
  isOpenModal,
  editingLabel,
  onEditLabel,
  onCreateLabel,
  onCloseModal }) {
  const [label, setLabel] = useState(editingLabel || initialLabel)
  const isEditing = Boolean(editingLabel)

  const handleSearch = async () => {
    const isRuc = label.ruc.length === 11
    const isDni = label.ruc.length === 8

    if (isDni) {
      console.log('isDni')
      const { company } = await getDni(label.ruc)
      setLabel({
        ...label,
        recipient: company
      })
    }

    if (isRuc) {
      console.log('isRuc')
      const { company } = await getRuc(label.ruc)
      setLabel({
        ...label,
        recipient: company
      })
    }
  }

  const handleSubmit = (event) => {
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

  console.log({ label })

  const handleChange = (event) => {
    const { value, name } = event.target
    setLabel({ ...label, [name]: value })

  }
  return (
    <Modal isOpen={isOpenModal} onClose={onCloseModal}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative w-full">
          <Input
            name="ruc"
            autoFocus
            onChange={handleChange}
            onBlur={handleSearch}
            value={label.ruc}
            labelText="Ruc"
            type="search"
          />
        </div>

        <Input
          name="recipient"
          onChange={handleChange}
          value={label.recipient}
          labelText="Destinatario"
          type="text"
        />
        <Input
          name="destination"
          required
          onChange={handleChange}
          value={label.destination}
          labelText="Destino"
          type="text"
        />

        <Input
          name="phone"
          onChange={handleChange}
          value={label.phone}
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
        <footer className="flex">
          <button className="btn btn-primary" type="submit">
            {isEditing ? 'Actualizar' : 'Crear'}
          </button>
        </footer>
      </form>
    </Modal>

  )
}

export default CreateUpdateLabelModal
