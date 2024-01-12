import { updateQuotation } from '@/lib/actions/quoatations'
import { fetchCustomers } from '@/lib/customers-data'
import { fetchQuotationById } from '@/lib/quotations-data'
import Breadcrumbs from '@/ui/breadcrumbs'
import EditForm from '@/ui/quotations/edit-form'
import { CreateUpdateQuotationSkeleton } from '@/ui/skeletons/quotations'
import { Suspense } from 'react'

async function EditFormWrapper({ number }) {
	const quotation = await fetchQuotationById({ number })
	const customers = await fetchCustomers()
	return (
		<EditForm
			action={updateQuotation}
			quotationToUpdate={quotation}
			serverCustomers={customers}
		/>
	)
}

async function UpdatePage({ params }) {
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
