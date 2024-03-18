import { TableSkeleton } from './table-skeleton'

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
				<div className='skeleton w-8 h-8'></div>
			</td>
			{/* Company */}
			<td>
				<div className='skeleton min-w-[250px] h-6'></div>
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
			<div className='hidden lg:block'>
				<TableSkeleton />
			</div>
		</div>
	)
}

function Row() {
	return (
		<tr>
			{/* Descripcion */}
			<td>
				<div className='skeleton h-10 w-[300px]'></div>
			</td>
			{/* U/M */}
			<td>
				<div className='skeleton w-12 h-6'></div>
			</td>
			{/* Cantidad */}
			<td>
				<div className='skeleton w-9 h-6'></div>
			</td>
			{/* Sin Igv */}
			<td>
				<div className='skeleton w-9 h-6'></div>
			</td>
			{/* P unit */}
			<td>
				<div className='skeleton w-9 h-6'></div>
			</td>
			{/* Total */}
			<td>
				<div className='skeleton w-9 h-6'></div>
			</td>
		</tr>
	)
}

export function QuotationSkeleton() {
	return (
		<div>
			<header className='flex justify-end gap-x-2'>
				<div className='flex gap-2'>
					<div className='skeleton w-12 h-11 rounded-md' />
					<div className='skeleton w-12 h-11 rounded-md' />
					<div className='skeleton w-12 h-11 rounded-md' />
				</div>
			</header>
			<div className='container mx-auto px-4 py-8'>
				<div className='rounded-lg shadow overflow-hidden'>
					<div className='py-4 flex justify-between'>
						<div>
							<div className='skeleton mb-2 w-20 h-8'></div>
							<div className='skeleton mb-2 w-72 h-8'></div>
							<div className='skeleton w-72 h-4'></div>
						</div>
						<div className='skeleton w-20 h-6'>
						</div>
					</div>
					<div className='skeleton w-48 h-4'>
					</div>
					<div className='overflow-x-auto'>
						<table className='table'>
							<thead>
								<tr>
									<th>Descripción</th>
									<th>U/M</th>
									<th>Cant</th>
									<th>Si IGv</th>
									<th>P.Unit</th>
									<th>Total</th>
								</tr>
							</thead>
							<tbody>
								<Row />
								<Row />
								<Row />
								<Row />
								<Row />
								<Row />
								<Row />
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export function CreateUpdateQuotationSkeleton({ isEdit }) {
	return (
		<>
			{!isEdit && (
				<div className='flex justify-between'>
					<div />
					<div className='- skeleton w-32 h-6'></div>
				</div>
			)}
			<div className='grid grid-cols-12 gap-4'>
				<div className='col-span-12'>
					<div className='skeleton w-20 h-4 mb-2'></div>
					<div className='skeleton h-10 w-full' />
				</div>
				<div className='col-span-6'>
					<div className='skeleton w-20 h-4 mb-2'></div>
					<div className='skeleton h-10 w-full' />
				</div>
				<div className='col-span-6'>
					<div className='skeleton w-20 h-4 mb-2'></div>
					<div className='skeleton h-10 w-full' />
				</div>
				<div className='col-span-12'>
					<div className='skeleton w-20 h-4 mb-2'></div>
					<div className='skeleton h-10 w-full' />
				</div>

				<div className='col-span-12'>
					<div className='skeleton w-20 h-4 mb-2'></div>
					<div className='skeleton h-10 w-full' />
				</div>
				<div className='col-span-6 flex items-center gap-4'>
					<div className='skeleton rounded-md w-7 h-7 ' />
					<div className='skeleton w-20 h-4 '>
					</div>
				</div>

				<div className='col-span-6 flex items-center gap-4'>
					<div className='skeleton rounded-md w-7 h-7 ' />
					<div className='skeleton w-20 h-4 '>
					</div>
				</div>

				<section className='col-span-12 mt-4'>
					<header className='flex items-center justify-between'>
						<div className='skeleton w-32 h-8'></div>
						<div className='skeleton w-36 h-8'>
						</div>
					</header>
				</section>
			</div>
			<div className='mt-4'>
				<div className='skeleton w-full h-6'></div>
				<div className='skeleton w-full h-32 mt-4'></div>
				<div className='flex justify-between mt-4'>
					<div className='skeleton w-32 h-8'></div>
					<div className='skeleton w-32 h-8'></div>
				</div>
			</div>
		</>
	)
}
