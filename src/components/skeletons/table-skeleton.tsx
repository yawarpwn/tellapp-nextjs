import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
function TableSkeletonRow() {
	return (
		<TableRow>
			<TableCell>
				<Skeleton className='skeleton w-8 h-8' />
			</TableCell>
			{/* Company */}
			<TableCell>
				<Skeleton className='skeleton min-w-[250px] h-6' />
			</TableCell>
			<TableCell>
				<Skeleton className='skeleton min-w-14 h-6' />
			</TableCell>
			{/* Fecha */}
			<TableCell>
				<Skeleton className='skeleton min-w-14 h-6' />
			</TableCell>
			{/* Total */}
			<TableCell>
				<Skeleton className='skeleton min-w-14 h-6' />
			</TableCell>
			<TableCell>
				<div className='flex items-center justify-center gap-x-2'>
					<div className='flex gap-4'>
						<Skeleton className='skeleton w-8 h-6' />
						<Skeleton className='skeleton w-8 h-6' />
					</div>
				</div>
			</TableCell>
		</TableRow>
	)
}

export function TableSkeleton() {
	return (
		<div className='overflow-x-auto'>
			<Table className='table'>
				{/* head */}
				<TableHeader>
					<TableRow>
						<TableHead>
							<Skeleton className='skeleton w-10 h-4' />
						</TableHead>
						<TableHead>
							<Skeleton className='skeleton min-w-[250px] h-4' />
						</TableHead>
						<TableHead>
							<Skeleton className='skeleton min-w-16 h-4' />
						</TableHead>
						<TableHead>
							<Skeleton className='skeleton min-w-12 h-4' />
						</TableHead>
						<TableHead>
							<Skeleton className='skeleton min-w-12 h-4' />
						</TableHead>
						<TableHead>
							<Skeleton className='skeleton min-w-12 h-4' />
						</TableHead>
					</TableRow>
				</TableHeader>
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
					<TableSkeletonRow />
					<TableSkeletonRow />
				</tbody>
			</Table>
		</div>
	)
}
