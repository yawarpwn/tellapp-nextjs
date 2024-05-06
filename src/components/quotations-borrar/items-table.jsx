import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { DeleteIcon, EditIcon } from '@/icons'
import { getIgv } from '@/lib/utils'

function ItemsTable({ items, onEdit, onDelete }) {
	const { total } = getIgv(items)
	return (
		<Table className='table '>
			<TableHeader>
				<TableRow>
					<TableHead>Descripción</TableHead>
					<TableHead>U/M</TableHead>
					<TableHead>Cant</TableHead>
					<TableHead>P. Unit</TableHead>
					<TableHead>Total</TableHead>
					<TableHead>Acciones</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items?.map((item, index) => {
					const even = index % 2 === 0
					return (
						<TableRow
							key={item.id}
							className={`${even ? 'bg-black/10' : ''}`}
						>
							<TableCell>
								<p className='min-w-[300px]'>
									{item.description}
								</p>
							</TableCell>
							<TableCell>{item.unit_size}</TableCell>
							<TableCell>{item.qty}</TableCell>
							<TableCell>{item.price.toFixed(2)}</TableCell>
							<TableCell>{(item.price * item.qty).toFixed(2)}</TableCell>
							<TableCell>
								<div className='flex gap-x-1'>
									<Button
										onClick={() => onEdit(item)}
										type='button'
										variant='icon'
									>
										<EditIcon size={20} />
									</Button>

									<Button
										type='button'
										className='btn'
										variant='icon'
										onClick={() => onDelete(item.id)}
									>
										<DeleteIcon size={20} />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					)
				})}
				<TableRow className='bg-black/20'>
					<TableCell
						colSpan={4}
						className='text-right py-3 px-4 uppercase font-semibold text-sm'
					>
						Total :
					</TableCell>
					<TableCell colSpan={4} className='text-left py-3 px-4'>
						{total}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}

export default ItemsTable
