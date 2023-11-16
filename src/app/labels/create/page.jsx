import AddLabelForm from '@/ui/labels/add-form'
import { createLabel } from '@/lib/actions/labels'
import { fetchFilteredAgencies } from '@/lib/agencies-data'

async function CreateLabelPage() {
  const agencies = await fetchFilteredAgencies({ query: '', page: 1 })
  return (
    <>
      <AddLabelForm action={createLabel} serverAgencies={agencies} />
    </>
  )
}

export default CreateLabelPage
