const shimmer =
	'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'

export function InvoiceSkeleton() {
	return (
		<div className='flex flex-row items-center justify-between border-b border-gray-800 py-4'>
			<div className='flex items-center'>
				<div className='mr-2 h-8 w-8 rounded-full bg-base-200' />
				<div className='min-w-0'>
					<div className='h-5 w-40 rounded-md bg-base-200' />
					<div className='mt-2 h-4 w-12 rounded-md bg-base-200' />
				</div>
			</div>
			<div className='mt-2 h-4 w-12 rounded-md bg-base-200' />
		</div>
	)
}

function TableSkeletonRow() {
	return (
		<tr>
			<td>
				<div className='skeleton w-10 h-5 '></div>
			</td>
			{/* Company */}
			<td>
				<div>
					<div className='skeleton w-[340px] h-5'></div>
					<div className='skeleton w-24 h-5 mt-1'></div>
				</div>
			</td>
			{/* Fecha */}
			<td>
				<div className='skeleton w-14 h-5'></div>
			</td>
			{/* Total */}
			<td>
				<div className='skeleton w-14 h-5'></div>
			</td>
			<td>
				<div className='flex items-center gap-x-2'>
					<div className='skeleton w-6 h-5'></div>
					<div className='skeleton w-6 h-5'></div>
				</div>
			</td>
		</tr>
	)
}

export function InvoicesMobileSkeleton() {
	return (
		<div className='card card-compact bg-base-200'>
			<div className='card-body'>
				<div className=' border-b border-base-content/30 pb-4 pt-2 flex flex-col gap-2'>
					<div className='flex items-center justify-between'>
						<div className='skeleton w-16 h-4'></div>
						<div className='skeleton w-16 h-4'></div>
					</div>
					<div className='skeleton w-60 h-4 mx-auto'></div>
				</div>
				<div className='flex w-full items-center justify-between'>
					<div className='skeleton w-16 h-4'></div>
					<div className='skeleton w-16 h-4'></div>
					<div className='flex gap-2'>
						<div className='skeleton w-6 h-4'></div>
						<div className='skeleton w-6 h-4'></div>
					</div>
				</div>
			</div>
		</div>
	)
}

function SkeletonCard() {
	return (
		<div className='card card-compact'>
			<div className='card-body bg-base-200'>
				<div className='flex flex-col items-center justify-between border-b border-base-content/10 pb-4 w-full'>
					<div className='mb-2 flex items-center justify-between w-full'>
						<div className='skeleton w-14 h-6'>
						</div>
						<div className='skeleton w-14 h-6'>
						</div>
					</div>
					<div className='skeleton w-72 h-6'>
					</div>
				</div>
				<div className='flex w-full items-center justify-between'>
					<div className='skeleton w-16 h-6'></div>
					<div className='skeleton w-16 h-6'></div>
					<div className='flex justify-end gap-2'>
						<div className='skeleton w-6 h-6'></div>
						<div className='skeleton w-6 h-6'></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export function QuotationsTableSkeleton() {
	return (
		<div className='mt-4'>
			<div className='lg:hidden flex flex-col gap-2'>
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</div>
			<div className='hidden lg:block overflow-x-auto'>
				<table className='table hidden lg:block'>
					{/* head */}
					<thead>
						<tr>
							<th>No</th>
							<th>Cliente</th>
							<th>Fecha</th>
							<th>Total</th>
							<th>Acciones</th>
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
		</div>
	)
}
