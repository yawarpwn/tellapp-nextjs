import Breadcrumbs from '@/ui/breadcrumbs'
import Form from '@/ui/customers/form'

function CreatePage() {
	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{ label: 'Clientes', href: '/customers' },
					{ label: 'Crear', href: '/customers/create', active: true },
				]}
			/>
			<Form />
		</>
	)
}

export default CreatePage
