import Breadcrumbs from '@/ui/breadcrumbs'
import CreateEditAgencyForm from '@/ui/agencies/create-edit-form'

function CreateAgencyPage() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Agencias', href: '/agencies' },
          { label: 'Crear', href: '/agencies/create', active: true },
        ]}
      />
      <CreateEditAgencyForm />
    </>
  )
}

export default CreateAgencyPage
