import Breadcrumbs from '@/components/breadcrumbs'
import EditForm from '@/components/quotations/edit-form'
import { CreateUpdateQuotationSkeleton } from '@/components/skeletons/quotations'
import { updateQuotation } from '@/lib/actions/quoatations'
import { fetchQuotationByNumber } from '@/lib/data/quotations'
import { Suspense } from 'react'

async function EditFormWrapper({ number }: { number: number }) {
	const quotation = await fetchQuotationByNumber({ number })
	return (
		<EditForm
			action={updateQuotation}
			quotationToUpdate={quotation}
		/>
	)
}

async function UpdatePage({ params }: { params: { number: string } }) {
	const number = Number(params.number)
	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: 'Cotizaciones',
						href: '/quotations',
					},
					{
						label: `#${number}`,
						href: `/quotations/${number}`,
					},
					{
						label: 'Editar',
						href: `/quotations/${number}/update`,
						active: true,
					},
				]}
			/>
			<Suspense fallback={<CreateUpdateQuotationSkeleton isEdit />}>
				<EditFormWrapper number={number} />
			</Suspense>
		</>
	)
}

export default UpdatePage
