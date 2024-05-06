import Breadcrumbs from '@/components/breadcrumbs'
import { DataTableSkeleton } from '@/components/skeletons/data-table'
import { QuotationSkeleton } from '@/components/skeletons/quotations'
import { Suspense } from 'react'
import { QuotationPageByNumber } from '../_components/quotation-page-by-number'

async function QuotationPage({ params }: { params: { number: string } }) {
	const number = Number(params.number)
	return (
		<div className='flex flex-col gap-4'>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: 'Cotizaciones',
						href: '/new-quos',
					},
					{
						label: ` #${number}`,
						href: `/new-quos/${number}`,
						active: true,
					},
				]}
			/>
			<Suspense fallback={<QuotationSkeleton />}>
				<QuotationPageByNumber number={number} />
			</Suspense>
		</div>
	)
}

export default QuotationPage
