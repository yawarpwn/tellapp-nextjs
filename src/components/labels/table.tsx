import { NoResultRow } from '@/components/no-result-row'
import { EyeIcon } from '@/icons'
import { deleteLabel } from '@/lib/actions/labels'
import { fetchFilteredLabels } from '@/lib/data/labels'
import Link from 'next/link'
import React from 'react'
import { EditButton } from '../buttons'
import DeleteActionForm from '../delete-action-form'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

interface Props {
	query: string
	currentPage: number
}
async function LabelsTable({ query, currentPage }: Props) {
	const labels = await fetchFilteredLabels({ query, currentPage })
	const hasLabels = labels?.length > 0
	return (
		<Table className='table'>
			{/* head */}
			<TableHeader>
				<TableRow>
					<TableCell>Destinatario</TableCell>
					<TableCell>Ruc/Dni</TableCell>
					<TableCell>Destino</TableCell>
					<TableCell>Agencia</TableCell>
					<TableCell>Teléfono</TableCell>
				</TableRow>
			</TableHeader>
			<TableBody>
				{hasLabels
					? labels.map(label => {
						return (
							<TableRow key={label.id}>
								<TableCell>
									<p className='min-w-[250px]'>{label.recipient}</p>
								</TableCell>
								<TableCell>
									<p>{label.dni_ruc}</p>
								</TableCell>
								<TableCell>
									<p>{label.address}</p>
									<p>{label.destination}</p>
								</TableCell>
								<TableCell>
									<p className='text-xs'>{label?.agencies?.company}</p>
								</TableCell>
								<td>{label.phone}</td>
								<TableCell>
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
								</TableCell>
							</TableRow>
						)
					})
					: <NoResultRow query={query} colSpan={5} />}
			</TableBody>
		</Table>
	)
}

export default LabelsTable
