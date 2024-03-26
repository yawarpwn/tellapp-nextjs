import { createQuotation } from '@/lib/actions/quoatations'
import { fetchCustomers } from '@/lib/data/customers'
import { fetchLastQuotation } from '@/lib/data/quotations'
import Breadcrumbs from '@/components/breadcrumbs'
import AddForm from '@/components/quotations/add-form'
import { CreateUpdateQuotationSkeleton } from '@/components/skeletons/quotations'
import { Suspense } from 'react'

async function AddFormWrapper() {
	const [customers, lastQuotation] = await Promise.all([
		fetchCustomers(),
		fetchLastQuotation(),
	])
	// const customers = await fetchCustomers()
	// const lastQuotation = await fetchLastQuotation()
	return (
		<AddForm
			action={createQuotation}
			lastQuotationNumber={lastQuotation.number}
			serverCustomers={customers}
		/>
	)
}

async function CreateQuotationPage() {
	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: 'Cotizaciones',
						href: '/quotations',
					},
					{
						label: 'Crear',
						href: '/quotations/crear',
						active: true,
					},
				]}
			/>
			<Suspense fallback={<CreateUpdateQuotationSkeleton />}>
				<AddFormWrapper />
			</Suspense>
		</>
	)
}

export default CreateQuotationPage
