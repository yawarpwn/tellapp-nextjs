import Breadcrumbs from '@/ui/breadcrumbs'
import AddForm from '@/ui/agencies/add-form'

function CreateAgencyPage() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Agencias', href: '/agencies' },
          { label: 'Crear', href: '/agencies/create', active: true },
        ]}
      />
      <AddForm />
    </>
  )
}

export default CreateAgencyPage
