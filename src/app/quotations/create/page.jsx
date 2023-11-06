import Breadcrumbs from '@/ui/breadcrumbs'
import AddForm from '@/ui/quotations/add-form'
import { createQuotation } from '@/lib/actions/quoatations'
import { fetchCustomers } from '@/lib/customers-data'

async function CreateQuotationPage() {
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
            label: 'Crear',
            href: '/quotations/crear',
            active: true,
          },
        ]}
      />
      <AddForm action={createQuotation} serverCustomers={customers} />
    </>
  )
}

export default CreateQuotationPage
