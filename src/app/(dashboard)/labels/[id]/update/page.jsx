import { fetchLabelsById } from '@/lib/labels-data'
import AddLabelForm from '@/ui/labels/add-form'
import { updateLabel } from '@/lib/actions/labels'
import { fetchFilteredAgencies } from '@/lib/agencies-data'

async function UpdateLagelPage({ params }) {
  const id = params?.id
  const label = await fetchLabelsById({ id })
  const agencies = await fetchFilteredAgencies({ query: '', page: 1 })
  return (
    <>
      <AddLabelForm
        labelToEdit={label}
        action={updateLabel}
        serverAgencies={agencies}
      />
    </>
  )
}

export default UpdateLagelPage
