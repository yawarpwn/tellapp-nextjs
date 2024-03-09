import { fetchFilteredSignals } from '@/lib/data/signals'
import { SignalEditForm } from '@/ui/signals/signal-edit-form'
import { TrashIcon } from 'lucide-react'

export interface Props {
	currentPage: number
	query: string
}

export async function SignalsTable({
	query,
	currentPage,
}: Props) {
	const signals = await fetchFilteredSignals(query, currentPage)
	return (
		<table className='table'>
			<thead>
				<tr>
					<th></th>
					<th>Nombre</th>
					<th>Codigo</th>
					<th>Ancho</th>
					<th>Alto</th>
					<th>Formato</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{signals?.map((signal) => (
					<tr key={signal.id}>
						<td>
							<div className='w-16 h-16 '>
								<img
									alt={signal.name}
									className='w-full h-full object-contain'
									src={signal.url}
								/>
							</div>
						</td>
						<td>{signal.name}</td>
						<td>{signal.code.toUpperCase()}</td>
						<td>{signal.width}</td>
						<td>{signal.height}</td>
						<td>{signal.format}</td>
						<td>
							<div className='flex gap-2 items-center'>
								<SignalEditForm signal={signal} />
								<button>
									<TrashIcon />
								</button>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
