import { fetchLabelsById } from "@/lib/labels-data"
import AddLabelForm from "@/ui/labels/add-form"
import { updateLabel } from '@/lib/actions/labels'

async function UpdateLagelPage({params}) {
  const id = params?.id
  const label = await fetchLabelsById({ id})
  return (
    <>
    <AddLabelForm labelToEdit={label} action={updateLabel} />
    </>
  )
}

export default UpdateLagelPage
