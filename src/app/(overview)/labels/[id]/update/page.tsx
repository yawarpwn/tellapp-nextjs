import { updateLabel } from '@/lib/actions/labels'
import { fetchFilteredAgencies } from '@/lib/data/agencies'
import { fetchLabelsById } from '@/lib/data/labels'
import AddLabelForm from '@/components/labels/add-form'

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
