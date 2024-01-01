import { fetchProductById } from '@/lib/products-data'
import Breadcrumbs from '@/ui/breadcrumbs'
import EditForm from '@/ui/products/edit-form'

async function UpdateProductPage({ params }) {
	const { id } = params
	const product = await fetchProductById({ id })

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: 'Productos',
						href: '/products',
					},
					{
						label: 'Edit',
						href: `/products/update/${id}`,
						active: true,
					},
				]}
			/>
			<EditForm product={product} />
		</>
	)
}

export default UpdateProductPage
