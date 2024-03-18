import { EyeIcon } from '@/icons'
import { deleteLabel } from '@/lib/actions/labels'
import { fetchFilteredLabels } from '@/lib/data/labels'
import Link from 'next/link'
import React from 'react'
import { EditButton } from '../buttons'
import DeleteActionForm from '../delete-action-form'

async function LabelsTable({ query, currentPage }) {
	const labels = await fetchFilteredLabels({ query, currentPage })
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
					{labels?.map(label => {
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
											<EyeIcon />
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
					})}
				</tbody>
			</table>
		</div>
	)
}

export default LabelsTable
