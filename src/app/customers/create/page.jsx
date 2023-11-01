import Form from '@/ui/customers/form'
import Breadcrumbs from '@/ui/breadcrumbs'

export const dynamic = 'force-dynamic'
function CreatePage() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clientes', href: '/customers' },
          { label: 'Crear', href: '/customers/create', active: true },
        ]}
      />
      <Form />
    </>
  )
}

export default CreatePage
