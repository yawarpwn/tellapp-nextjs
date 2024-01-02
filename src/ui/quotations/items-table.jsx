import { DeleteIcon, EditIcon } from '@/icons'
import { getIgv } from '@/utils'

function ItemsTable({ items, onEdit, onDelete }) {
	const { total } = getIgv(items)
	return (
		<div className='overflow-x-auto'>
			<table className='table'>
				<thead>
					<tr>
						<th>Descripción</th>
						<th>U/M</th>
						<th>Cant</th>
						<th>P. Unit</th>
						<th>Total</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{items?.map((item, index) => {
						const even = index % 2 === 0
						console.log(item)
						return (
							<tr key={item.id} className={`${even ? 'bg-black/10' : ''}`}>
								<td>
									<p className='w-[300px]'>{item.description}</p>
								</td>
								<td>{item.unit_size}</td>
								<td>{item.qty}</td>
								<td>{item.price.toFixed(2)}</td>
								<td>{(item.price * item.qty).toFixed(2)}</td>
								<td>
									<div className='flex gap-x-1'>
										<button
											onClick={() => onEdit(item)}
											type='button'
											className='btn'
										>
											<EditIcon />
										</button>

										<button
											type='button'
											className='btn'
											onClick={() => onDelete(item.id)}
										>
											<DeleteIcon />
										</button>
									</div>
								</td>
							</tr>
						)
					})}
					<tr className='bg-black/20'>
						<td
							colSpan={3}
							className='text-right py-3 px-4 uppercase font-semibold text-sm'
						>
							Total :
						</td>
						<td colSpan={3} className='text-left py-3 px-4'>
							{total}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default ItemsTable
