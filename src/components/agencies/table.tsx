import { EditFormAgency } from '@/components/agencies'
import { NoResultRow } from '@/components/no-result-row'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { deleteAgency } from '@/lib/actions/agencies'
import { fetchFilteredAgencies } from '@/lib/data/agencies'
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
			<Table className='table'>
				{/* head */}
				<TableHeader>
					<TableRow>
						<TableCell>Empresa</TableCell>
						<TableCell>Ruc</TableCell>
						<TableCell>Dirección</TableCell>
						<TableCell>Telefono</TableCell>
						<TableCell>Destinos</TableCell>
						<TableCell>Accciones</TableCell>
					</TableRow>
				</TableHeader>
				<TableBody>
					{hasAgencies
						? agencies.map(agency => {
							const { company, id, ruc, address, destinations, phone } = agency
							return (
								<TableRow key={id}>
									<TableCell>
										<div>
											<p className='min-w-[250px]'>{company}</p>
										</div>
									</TableCell>
									<TableCell>{ruc}</TableCell>
									<TableCell>
										<p className='text-xs'>{address ?? 'Sin dirección'}</p>
									</TableCell>
									<TableCell>{phone ?? 'Desconocido'}</TableCell>
									<TableCell>
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
									</TableCell>
									<TableCell>
										<div className='flex gap-2'>
											<EditFormAgency agency={agency} />
											<DeleteActionForm id={id} deleteAction={deleteAgency} />
										</div>
									</TableCell>
								</TableRow>
							)
						})
						: <NoResultRow query={query} colSpan={6} />}
				</TableBody>
			</Table>
		</div>
	)
}

export default AgenciesTable
