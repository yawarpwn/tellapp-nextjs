import { QuotationsTableSkeleton } from '@/ui/skeletons/quotations'
function Loading() {
	return (
		<>
			<header className='flex items-center justify-between gap-2'>
				<div className='skeleton w-64 h-10'></div>
				<div className='skeleton w-24 h-10'></div>
			</header>
			<div>
				<QuotationsTableSkeleton />
			</div>
		</>
	)
}

export default Loading
