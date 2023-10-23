'use client'
import Input from '@/components/input'
import { updateAgencie } from './actions'
import ConfirmActionModal from '@/components/confirm-action-modal'
import { EditIcon } from '@/icons'

function AddAgencieForm({ agency }) {
  return (
    <>
      <ConfirmActionModal
        action={updateAgencie}
        openButtonContent={<EditIcon />}
        message="Actualizar Agencia"
      >
        <Input
          name="company"
          labelText={'Agencia'}
          type="text"
          required
          defaultValue={agency.company}
        />
        <Input
          labelText={'Ruc'}
          name="ruc"
          type="number"
          defaultValue={agency.ruc}
          required
        />

        <Input
          labelText={'Dirección'}
          name="address"
          placeholder="Dirección"
          type="text"
          defaultValue={agency.address ?? ''}
        />
        <input className="sr-only" name="id" defaultValue={agency.id} />
      </ConfirmActionModal>
    </>
  )
}

export default AddAgencieForm
