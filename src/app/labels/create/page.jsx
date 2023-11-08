import AddLabelForm from '@/ui/labels/add-form'
import { createLabel } from '@/lib/actions/labels'

function CreateLabelPage() {
  return (
    <>
      <AddLabelForm action={createLabel} />
    </>
  )
}

export default CreateLabelPage
