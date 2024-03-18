function TableSkeletonRow() {
	return (
		<tr>
			<td>
				<div className='skeleton w-8 h-8'></div>
			</td>
			{/* Company */}
			<td>
				<div className='skeleton min-w-[250px] h-6'></div>
			</td>
			<td>
				<div className='skeleton min-w-14 h-6'></div>
			</td>
			{/* Fecha */}
			<td>
				<div className='skeleton min-w-14 h-6'></div>
			</td>
			{/* Total */}
			<td>
				<div className='skeleton min-w-14 h-6'></div>
			</td>
			<td>
				<div className='flex items-center justify-center gap-x-2'>
					<div className='flex gap-4'>
						<div className='skeleton w-8 h-6'></div>
						<div className='skeleton w-8 h-6'></div>
					</div>
				</div>
			</td>
		</tr>
	)
}

export function TableSkeleton() {
	return (
		<div className='overflow-x-auto'>
			<table className='table'>
				{/* head */}
				<thead>
					<tr>
						<th>
							<div className='skeleton w-10 h-4'></div>
						</th>
						<th>
							<div className='skeleton min-w-[250px] h-4'></div>
						</th>
						<th>
							<div className='skeleton min-w-16 h-4'></div>
						</th>
						<th>
							<div className='skeleton min-w-12 h-4'></div>
						</th>
						<th>
							<div className='skeleton min-w-12 h-4'></div>
						</th>
						<th>
							<div className='skeleton min-w-12 h-4'></div>
						</th>
					</tr>
				</thead>
				<tbody>
					<TableSkeletonRow />
					<TableSkeletonRow />
					<TableSkeletonRow />
					<TableSkeletonRow />
					<TableSkeletonRow />
					<TableSkeletonRow />
					<TableSkeletonRow />
					<TableSkeletonRow />
					<TableSkeletonRow />
					<TableSkeletonRow />
					<TableSkeletonRow />
				</tbody>
			</table>
		</div>
	)
}
