function SkeletonCard() {
	return (
		<div className='card card-compact bg-base-200 shadow-sm'>
			<div className='card-body'>
				<div className='border-b border-b-base-content/10 pb-2 flex justify-center'>
					<div className='skeleton w-11/12 h-12 '>
					</div>
				</div>
				<div className='flex justify-between border-b border-b-base-content/10 py-2 text-center'>
					<div className='skeleton w-16 h-4'>
					</div>
					<div className='skeleton w-16 h-4'>
					</div>
					<div className='skeleton w-16 h-4'>
					</div>
				</div>
				<div className='flex justify-between'>
					<div className='skeleton w-16 h-4'>
					</div>
					<div className='skeleton w-16 h-4'>
					</div>
					<div className='flex gap-x-2'>
						<div className='skeleton w-6 h-6'></div>
						<div className='skeleton w-6 h-6'></div>
					</div>
				</div>
			</div>
		</div>
	)
}

function ProductSkeletonRow() {
	return (
		<tr>
			<td>
				<div className='flex flex-col gap-1.5'>
					<p className='skeleton w-[280px] h-2.5'></p>
					<p className='skeleton w-[280px] h-2.5'></p>
					<p className='skeleton w-[280px] h-2.5'></p>
					<p className='skeleton w-40 h-2.5'></p>
				</div>
			</td>
			<td>
				<div className='skeleton w-12 h-4 truncate '>
				</div>
			</td>
			{/* U/M */}
			<td>
				<div className='skeleton w-12 h-4'></div>
			</td>
			{/* Cost */}
			<td>
				<div className='skeleton w-10 h-4'></div>
			</td>
			{/* Precio */}
			<td>
				<div className='skeleton w-10 h-4'></div>
			</td>
			{/* Category */}
			<td>
				<p className='skeleton h-4 w-[40px] truncate'>
				</p>
			</td>
			{/* Acciones */}
			<td>
				<div className='flex items-center gap-x-2'>
					<div className='skeleton w-6 h-4'></div>
					<div className='skeleton w-6 h-4'></div>
				</div>
			</td>
		</tr>
	)
}

export function ProductsSkeleton() {
	return (
		<>
			<div className='overflow-x-auto'>
				<table className='table table-xs mt-4'>
					{/* head */}
					<thead>
						<tr>
							<th>Descripcion</th>
							<th>Codigo</th>
							<th>U/M</th>
							<th>Costo</th>
							<th>Precio</th>
							<th>Categ</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
						<ProductSkeletonRow />
					</tbody>
				</table>
			</div>
		</>
	)
}
