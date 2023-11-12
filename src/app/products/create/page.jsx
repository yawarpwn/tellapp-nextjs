import AddForm from '@/ui/products/add-form'
import Breadcrumbs from '@/ui/breadcrumbs'

function CreatePage() {
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Productos', href: '/products' },
          { label: 'Crear', href: '/products/create', active: true },
        ]}
      />
      <AddForm />
    </>
  )
}

export default CreatePage
