import Breadcrumbs from '@/ui/breadcrumbs'
import AddForm from '@/ui/quotations/add-form'
import { createQuotation } from '@/lib/actions/quoatations'
import { fetchCustomers } from '@/lib/customers-data'
import { fetchLastQuotation } from '@/lib/quotations-data'

async function CreateQuotationPage() {
  const customers = await fetchCustomers()
  const lastQuotation = await fetchLastQuotation()
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
      <AddForm
        action={createQuotation}
        lastQuotationNumber={lastQuotation.number}
        serverCustomers={customers}
      />
    </>
  )
}

export default CreateQuotationPage
