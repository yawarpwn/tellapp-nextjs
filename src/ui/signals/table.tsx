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
		<div className='overflow-x-auto'>
			<table className='table table-sm'>
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
								<div className='w-12 h-12 '>
									<img
										alt={signal.name}
										className='w-full h-full object-contain'
										src={`https://res.cloudinary.com/tellsenales-cloud/image/upload/c_scale,w_40/${signal.public_id}.${signal.format}`}
									/>
								</div>
							</td>
							<td>
								<div className='w-[200px]'>
									{signal.name}
								</div>
							</td>
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
		</div>
	)
}
