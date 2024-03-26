import {
	SignalDeleteFormButton,
	SignalEditFormButton,
} from '@/components/signals/signal-button'
import { NoResultRow } from '@/components/ui/no-result-row'
import { fetchFilteredSignals } from '@/lib/data/signals'

export interface Props {
	currentPage: number
	query: string
}

export async function SignalsTable({
	query,
	currentPage,
}: Props) {
	const signals = await fetchFilteredSignals(query, currentPage)
	const hasSignals = signals && signals.length > 0
	return (
		<div className='overflow-x-auto mt-4'>
			<table className='table table-sm'>
				<thead>
					<tr>
						<th></th>
						<th>Nombre</th>
						<th>Categoria</th>
						<th>Codigo</th>
						<th>Ancho</th>
						<th>Alto</th>
						<th>Formato</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{hasSignals
						? signals.map((signal) => (
							<tr key={signal.id}>
								<td>
									<div className='w-12 h-12 '>
										<img
											alt={signal.title}
											className='w-full h-full object-contain'
											src={`https://res.cloudinary.com/tellsenales-cloud/image/upload/c_scale,w_40/${signal.public_id}.${signal.format}`}
										/>
									</div>
								</td>
								<td>
									<div className='min-w-[250px]'>
										{signal.title}
									</div>
								</td>
								<td>{signal.category}</td>
								<td>{signal.code.toUpperCase()}</td>
								<td>{signal.width}</td>
								<td>{signal.height}</td>
								<td>{signal.format}</td>
								<td>
									<div className='flex gap-2 items-center'>
										<SignalEditFormButton item={signal} />
										<SignalDeleteFormButton
											id={signal.id}
											publicId={signal.public_id}
										/>
									</div>
								</td>
							</tr>
						))
						: <NoResultRow query={query} colSpan={7} />}
				</tbody>
			</table>
		</div>
	)
}
