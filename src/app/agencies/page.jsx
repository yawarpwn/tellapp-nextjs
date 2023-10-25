import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AddFormAction from '@/components/form-actions/add-form-action'
import DeleteFormAction from '@/components/form-actions/delete-form-action'
import EditFormAction from '@/components/form-actions/edit-form-action'
import {
  createAgencieAction,
  deleteAgencieAction,
  updateAgencieAction,
} from './actions'
import Input from '@/components/input'

function InputsCreateUpdate({ agency }) {
  return (
    <>
      <Input
        name="company"
        labelText={'Agencia'}
        type="text"
        required
        defaultValue={agency?.company}
      />
      <Input
        labelText={'Ruc'}
        name="ruc"
        type="number"
        defaultValue={agency?.ruc}
        required
      />

      <Input
        labelText={'Dirección'}
        name="address"
        placeholder="Dirección"
        type="text"
        defaultValue={agency?.address}
      />
      <input className="sr-only" name="id" defaultValue={agency?.id} />
    </>
  )
}

export const dynamic = 'force-dynamic'
async function AgenciesPage() {
  const storeCookies = cookies()
  const supabase = createServerComponentClient({ cookies: () => storeCookies })
  const { data: agencies } = await supabase.from('agencies').select()

  return (
    <div>
      <div className="overflow-x-auto">
        <header>
          <AddFormAction
            addAction={createAgencieAction}
            titleModal="Agregar Agencia"
          >
            <InputsCreateUpdate />
          </AddFormAction>
        </header>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Ruc</th>
              <th>Telefono</th>
              <th>Accciones</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map(agency => {
              const { company, id, ruc, address, destinations } = agency
              return (
                <tr key={id}>
                  <td>
                    <div>
                      <p className="w-[300px]">{company}</p>
                      <p className="text-xs">{address ?? 'Sin dirección'}</p>
                    </div>
                  </td>
                  <td>{ruc}</td>
                  <td>null</td>
                  <td>
                    <div className="flex gap-2">
                      <EditFormAction
                        titleModal="Editar Agencia"
                        updateAction={updateAgencieAction}
                      >
                        <InputsCreateUpdate agency={agency} />
                      </EditFormAction>
                      <DeleteFormAction
                        titleModal="¿Seguro deseas eliminar esta agencia?"
                        deleteAction={deleteAgencieAction}
                        id={id}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AgenciesPage
