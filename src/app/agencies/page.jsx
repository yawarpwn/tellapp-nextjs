import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AddAgencieForm from "./add-agencie-form";
import DeleteAgencieForm from "./delete-agencie-form";

export const dynamic = 'force-dynamic'
async function AgenciesPage() {
  const storeCookies = cookies()
  const supabase = createServerComponentClient({ cookies: () => storeCookies })
  const { data: agencies } = await supabase.from('agencies').select()

  return (
    <div>
      <div className="overflow-x-auto">
        <header>
          <AddAgencieForm />
        </header>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Ruc</th>
              <th>Telefono</th>
              <th>Email</th>
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
                    null
                  </td>
                  <td>
                    <DeleteAgencieForm id={id} />
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
