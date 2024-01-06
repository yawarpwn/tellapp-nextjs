import { updateQuotation } from '@/lib/actions/quoatations'
import { fetchCustomers } from '@/lib/customers-data'
import { fetchQuotationById } from '@/lib/quotations-data'
import Breadcrumbs from '@/ui/breadcrumbs'
import EditForm from '@/ui/quotations/edit-form'

async function UpdatePage({ params }) {
	const { number } = params
	const quotation = await fetchQuotationById({ number })
	const customers = await fetchCustomers()
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
			<EditForm
				action={updateQuotation}
				quotationToUpdate={quotation}
				serverCustomers={customers}
			/>
		</>
	)
}

export default UpdatePage
