import AddLabelForm from '@/components/labels/add-form'
import { createLabel } from '@/lib/actions/labels'
import { fetchAgencies } from '@/lib/data/agencies'

async function CreateLabelPage() {
	const agencies = await fetchAgencies()

	return (
		<>
			<AddLabelForm action={createLabel} serverAgencies={agencies} />
		</>
	)
}

export default CreateLabelPage
