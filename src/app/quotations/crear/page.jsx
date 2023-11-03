import Breadcrumbs from '@/ui/breadcrumbs'
import AddForm from '@/ui/quotations/add-form'

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
      <AddForm />
    </>
  )
}

export default CreateQuotationPage
