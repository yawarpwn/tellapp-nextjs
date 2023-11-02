import {  fetchAgencyById } from "@/lib/agencies-data"
import EditForm from "@/ui/agencies/edit-form"
import Breadcrumbs from "@/ui/breadcrumbs"
async function UpdatePage({ params}) {
  const { id } = params
  const agency = await fetchAgencyById({id})
  return (
    <>
    <Breadcrumbs
    breadcrumbs={[{
      label: 'Agencias',
      href: '/agencies',
    }, {
      label: 'Actualizar',
      href: `/agencies/${id}/update`,
      active: true
    }]}
    />
    <EditForm agency={agency} />
    </>
  )
}

export default UpdatePage
