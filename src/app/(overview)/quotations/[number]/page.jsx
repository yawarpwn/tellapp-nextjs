import Breadcrumbs from '@/ui/breadcrumbs'
import { Quotation } from '@/ui/quotations/quotation'
import { QuotationSkeleton } from '@/ui/skeletons/quotations'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
async function QuotationPage({ params }) {
	const { number } = params

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: 'Cotizaciones',
						href: '/quotations',
					},
					{
						label: ` #${number}`,
						href: `/quotations/${number}`,
						active: true,
					},
				]}
			/>
			<Suspense fallback={<QuotationSkeleton />}>
				<Quotation number={number} />
			</Suspense>
		</>
	)
}

export default QuotationPage
