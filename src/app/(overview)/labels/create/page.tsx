import { createLabel } from '@/lib/actions/labels'
import { fetchAgencies } from '@/lib/data/agencies'
import AddLabelForm from '@/ui/labels/add-form'

async function CreateLabelPage() {
	const agencies = await fetchAgencies()

	return (
		<>
			<AddLabelForm action={createLabel} serverAgencies={agencies} />
		</>
	)
}

export default CreateLabelPage
