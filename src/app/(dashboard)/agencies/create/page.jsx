import { createAgency } from '@/lib/actions/agencies'
import CreateEditAgencyForm from '@/ui/agencies/create-edit-form'
import Breadcrumbs from '@/ui/breadcrumbs'
function CreateAgencyPage() {
	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Agencias', href: '/agencies' },
					{ label: 'Crear', href: '/agencies/create', active: true },
				]}
			/>
			<CreateEditAgencyForm action={createAgency} />
		</>
	)
}

export default CreateAgencyPage
