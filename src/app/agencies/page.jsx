import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AddAgencieForm from "./add-agencie-form";
import DeleteAgencieForm from "./delete-agencie-form";
import EditAgencieForm from './editAgencieForm'
import { createAgencie } from "./actions";
import Input from '@/components/input'

export const dynamic = 'force-dynamic'
async function AgenciesPage() {
  const storeCookies = cookies()
  const supabase = createServerComponentClient({ cookies: () => storeCookies })
  const { data: agencies } = await supabase.from('agencies').select()

  return (
    <div>
      <div className="overflow-x-auto">
        <header>
          <AddAgencieForm  
            addAction={createAgencie}
            titleModal='Agregar Agencia'
          >
            <Input
              name="company"
              labelText={'Nombre de agencia'}
              placeholder="Shalom Empresarial"
              type="text"
              required
            />
            <Input
              labelText={'Ruc'}
              name="ruc"
              type="number"
              placeholder="206006666035"
              required
            />
            <Input
              labelText={'Dirección'}
              name="address"
              type="text"
              placeholder="Av. Fauccett 232 - Callao"
            />
            
          </AddAgencieForm>
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
              const { company, id, ruc, address, destinations, } = agency
              return (
                <tr key={id}>
                  <td>
                    <div>
                      <p className="w-[300px] text-yellow-100">{company}</p>
                      <p className='text-xs'>{address ?? 'Sin dirección'}</p>
                    </div>
                  </td>
                  <td>
                    {ruc}
                  </td>
                  <td>
                    null
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <EditAgencieForm agency={agency} />
                      <DeleteAgencieForm id={id} />
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
