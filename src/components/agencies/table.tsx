import { deleteAgency } from '@/lib/actions/agencies'
import { fetchFilteredAgencies } from '@/lib/data/agencies'
import { EditFormAgency } from ../ui/agencies'
import { NoResultRow } from '@/components/no-result-row'
import DeleteActionForm from '../delete-action-form'
interface Props {
	query: string
	currentPage: number
}
async function AgenciesTable({ query, currentPage }: Props) {
	const agencies = await fetchFilteredAgencies({ query, currentPage })
	const hasAgencies = agencies?.length > 0
	return (
		<div className='overflow-x-auto'>
			<table className='table'>
				{/* head */}
				<thead>
					<tr>
						<th>Empresa</th>
						<th>Ruc</th>
						<th>Dirección</th>
						<th>Telefono</th>
						<th>Destinos</th>
						<th>Accciones</th>
					</tr>
				</thead>
				<tbody>
					{hasAgencies
						? agencies.map(agency => {
							const { company, id, ruc, address, destinations, phone } = agency
							return (
								<tr key={id}>
									<td>
										<div>
											<p className='min-w-[250px]'>{company}</p>
										</div>
									</td>
									<td>{ruc}</td>
									<td>
										<p className='text-xs'>{address ?? 'Sin dirección'}</p>
									</td>
									<td>{phone ?? 'Desconocido'}</td>
									<td>
										{destinations?.length > 0 && (
											<select defaultValue='' className='select'>
												<option defaultValue='' disabled>
													Destinos
												</option>
												{destinations.map(destination => (
													<option key={destination} value={destination}>
														{destination}
													</option>
												))}
											</select>
										)}
									</td>
									<td>
										<div className='flex gap-2'>
											<EditFormAgency agency={agency} />
											<DeleteActionForm id={id} deleteAction={deleteAgency} />
										</div>
									</td>
								</tr>
							)
						})
						: <NoResultRow query={query} colSpan={6} />}
				</tbody>
			</table>
		</div>
	)
}

export default AgenciesTable
