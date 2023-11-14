import { fetchFilteredAgencies } from '@/lib/agencies-data'
import { EditButton } from '../buttons'
import { deleteAgency } from '@/lib/actions/agencies'
import DeleteActionForm from '../delete-action-form'
async function AgenciesTable({ query, currentPage }) {
  const agencies = await fetchFilteredAgencies({ query, currentPage })
  return (
    <div className="overflow-x-auto">
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
                    <EditButton href={`/agencies/${id}/update`} />
                    <DeleteActionForm id={id} deleteAction={deleteAgency} />
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AgenciesTable
