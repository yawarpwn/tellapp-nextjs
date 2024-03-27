import { EyeIcon } from '@/icons'
import { deleteLabel } from '@/lib/actions/labels'
import { fetchFilteredLabels } from '@/lib/data/labels'
import Link from 'next/link'
import React from 'react'
import { EditButton } from '../buttons'
import { NoResultRow } from '@/components/no-result-row'
import DeleteActionForm from '../delete-action-form'

interface Props {
	query: string
	currentPage: number
}
async function LabelsTable({ query, currentPage }: Props) {
	const labels = await fetchFilteredLabels({ query, currentPage })
	const hasLabels = labels?.length > 0
	return (
		<div className='overflow-x-auto'>
			<table className='table'>
				{/* head */}
				<thead>
					<tr>
						<th>Destinatario</th>
						<th>Ruc/Dni</th>
						<th>Destino</th>
						<th>Agencia</th>
						<th>Teléfono</th>
					</tr>
				</thead>
				<tbody>
					{hasLabels
						? labels.map(label => {
							return (
								<tr key={label.id}>
									<td>
										<p className='min-w-[250px]'>{label.recipient}</p>
									</td>
									<td>
										<p>{label.dni_ruc}</p>
									</td>
									<td>
										<p>{label.address}</p>
										<p>{label.destination}</p>
									</td>
									<td>
										<p className='text-xs'>{label?.agencies?.company}</p>
									</td>
									<td>{label.phone}</td>
									<td>
										<div className='flex items-center gap-2'>
											<Link href={`/labels/${label.id}`}>
												<EyeIcon size={20} />
											</Link>
											<EditButton href={`/labels/${label.id}/update`} />
											<DeleteActionForm
												id={label.id}
												deleteAction={deleteLabel}
											/>
										</div>
									</td>
								</tr>
							)
						})
						: <NoResultRow query={query} colSpan={5} />}
				</tbody>
			</table>
		</div>
	)
}

export default LabelsTable
