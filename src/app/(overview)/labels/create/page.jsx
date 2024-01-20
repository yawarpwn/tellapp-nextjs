import { createLabel } from '@/lib/actions/labels'
import { fetchFilteredAgencies } from '@/lib/data/agencies'
import AddLabelForm from '@/ui/labels/add-form'

async function CreateLabelPage() {
	const agencies = await fetchFilteredAgencies({ query: '', page: 1 })
	return (
		<>
			<AddLabelForm action={createLabel} serverAgencies={agencies} />
		</>
	)
}

export default CreateLabelPage
