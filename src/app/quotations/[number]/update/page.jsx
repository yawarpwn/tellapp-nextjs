import { fetchQuotationById } from '@/lib/quotations-data'
import Breadcrumbs from '@/ui/breadcrumbs'
import AddEditForm from '@/ui/quotations/add-edit-form'
import { updateQuotation } from '@/lib/actions/quoatations'
import { fetchCustomers } from '@/lib/customers-data'

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
      <AddEditForm
        action={updateQuotation}
        quotationToUpdate={quotation}
        serverCustomers={customers}
      />
    </>
  )
}

export default UpdatePage
